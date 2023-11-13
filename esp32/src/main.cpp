#include <Arduino.h>
#include <SPI.h>
#include <WiFi.h>

#include "imu.h"

#include "wificreds.h"
WiFiServer server(80);

long bootTime = millis();

void setup() {
    imuInit();
    
    Serial.begin(115200);

    WiFi.begin(ssid, pass);
    while (WiFi.status() != WL_CONNECTED);
    server.begin();
}

void loop() {
    WiFiClient client = server.available();
    if(!client) return;
    String dump = imuDump();
    client.flush();
    client.println("HTTP/1.1 200 OK");
    client.println("Content-type:text/text");
    client.println("Content-length:" + String(dump.length()));
    client.println();
    client.println(dump);
}