from random import random
from time import sleep, time
# from websockets.server import serve, process
import websockets
from math import sin
import asyncio


def rnd(t):
    return sin(t) + random() * 0

def random_payload(start):
    F = 3.1415 * 2/3
    t = time() - start
    return f't={t}\nx={rnd(t)}\ny={rnd(t+F)}\nz={rnd(t+2*F)}'

async def random_handler(client):
    start = time()
    period = 0.1
    while True:
        asyncio.wait_for(client.recv(), 10)
        await client.send(random_payload(start))
        await asyncio.sleep(period)
async def main():
    async with websockets.serve(random_handler, "localhost", 7778) as server:
        await server.serve_forever()

asyncio.run(main())
