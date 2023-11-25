class DataServerSocket {
    socket = null
    lastUpdate = 0
    maxPoints = 50
    constructor() {
        this.data = []
    }

    connect(address) {
        this.socket = new WebSocket(address)
        this.socket.addEventListener('message', (event) => {
            const content = {}
            for(const line of event.data.split('\n')) {
                const [key, value] = line.split('=')
                content[key] = Number(value)
            }
            this.data.push(content)
            if(this.data.length > this.maxPoints) {
                this.data.shift()
            }
            this.data.lastUpdate = Date.now()
        })
    }

    addData(data) {
        console.log(data)
        this.data.push(data)
    }

    requestPeriod(period) {
        if(this.socket.readyState === WebSocket.OPEN) {
            this.socket.send('p='+period)
            return
        }
        this.socket.addEventListener('open', () => {
            this.socket.send('p='+period)
        })
    }
}

class DataServer {
    data = []
    maxPoints = 100
    frequency = 0

    constructor(endpoint, frequency = 200) {
        this.endpoint = endpoint
        this.frequency = frequency

        setInterval(() => {
            fetch(this.endpoint).then(rsp => rsp.text()).then(data => {
                    this.data.push(this.parseData(data))
                    if(this.data.length > this.maxPoints)
                        this.data.shift()
                })
        }, this.frequency)
    }

    parseData(text) {
        const obj = {}
        for(const line of text.split('\n')) {
            const [key, value] = line.split(' = ')
            obj[key] = Number(value)
        }
        return obj
    }

}

export { DataServer }