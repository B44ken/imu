# IMU Dashboard

### Build the backend
1. Create `esp32/src/wificreds.h` and write:
```c++
String ssid = "your network name";
String pass = "your password";
```
2. Build with PlatformIO: `pio run --target upload`
3. Connect to your board's serial, where the it will report its IP address