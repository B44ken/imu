#include <Arduino.h>
#include <SPI.h>
#include <esp_wifi.h>
#include <WiFi.h>

#include "imu.h"
#include "wificreds.h"

WiFiServer server(80);


long bootTime = millis();

void setup() {
    Serial.begin(115200);
    imuInit();
    
    WiFi.mode(WIFI_STA);
    esp_wifi_set_ps(WIFI_PS_NONE);
    WiFi.begin(ssid, pass);

    while (WiFi.status() != WL_CONNECTED);

    server.begin();
    WiFi.setSleep(false);
}

void loop() {
    WiFiClient client = server.available();
    if(!client) return;

    String url;
    while(client.connected()) {
        if(client.available()) {
            String line = client.readStringUntil('\n');
            if(line.startsWith("GET")) {
                url = line.substring(4, line.length() - 9);
            }
            if(line == "\r") break;
        }
    }

    if(url == "/") {
        handleRoot(client);
    } else if(url == "/api/dump") {
        String dump = imuDump();
        client.flush();
        client.println("HTTP/1.1 200 OK");
        client.println("Content-type:text/text");
        client.println("Content-length:" + String(dump.length()));
        client.println();
        client.println(dump);
    } else {
        client.println("HTTP/1.1 404 Not Found");
        client.println("Content-type:text/text");
        client.println("Content-length:0");
        client.println();
    }

}