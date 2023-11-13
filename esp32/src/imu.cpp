#include <Arduino.h>
#include <Wire.h>

const int imu_addr = 0x68;
const int gyro_reg = 0x3b;

void imuInit() {
    Wire.begin();
    Wire.beginTransmission(0x68);
    Wire.write(0x6b);
    Wire.write(0x00);
    Wire.endTransmission(true);
}

float* imuRead(int reg, int n) {
  Wire.beginTransmission(0x68);
  Wire.write(reg);
  Wire.endTransmission(true);
  Wire.requestFrom(imu_addr, 2 * n, true);

  float* values = new float[n];
  for (int i = 0; i < n; i++) {
    values[i] = (Wire.read() << 8 | Wire.read()) / 16384.0;
  }
  return values;
}

float* imuReadGyro() {
  return imuRead(gyro_reg, 3);
}

float* imuReadAccel() {
  return imuRead(gyro_reg, 3);
}

String imuDump() {
  float* gyro = imuReadGyro();
  Serial.printf("gyro_x = %f, gyro_y = %f, gyro_z = %f\n", gyro[0], gyro[1], gyro[2]);
  return "gyro_x = " + String(gyro[0]) + "\n" +
         "gyro_y = " + String(gyro[1]) + "\n" +
         "gyro_z = " + String(gyro[2]) + "\n";
}

