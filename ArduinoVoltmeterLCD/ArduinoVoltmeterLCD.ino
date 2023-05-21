// include the library code
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

#if defined(ARDUINO) && ARDUINO >= 100
#define printByte(args)  write(args);
#else
#define printByte(args)  print(args,BYTE);
#endif

// configure LCD
LiquidCrystal_I2C lcd(0x27,16,2);  // address to 0x27, 16 chars, 2 line display

// variables
int analogInput = 0; // pin A0
float voltage = 0.0;
int measuredValue = 0;
const float maxVoltage = 5.0;
const float numLevels = 1024.0;
const float numChars = 16.0;
const float voltagePerChar = maxVoltage / numChars;

// custom symbols for measurement scale
uint8_t block5[8] = {0x1f,0x1f,0x1f,0x1f,0x1f,0x1f,0x1f};
uint8_t block4[8] = {0x1e,0x1e,0x1e,0x1e,0x1e,0x1e,0x1e};
uint8_t block3[8] = {0x1c,0x1c,0x1c,0x1c,0x1c,0x1c,0x1c};
uint8_t block2[8] = {0x18,0x18,0x18,0x18,0x18,0x18,0x18};
uint8_t block1[8] = {0x10,0x10,0x10,0x10,0x10,0x10,0x10};
uint8_t block0[8] = {0x00,0x00,0x00,0x00,0x00,0x00,0x00};

// code that runs once
void setup()
{
  // initialize the LCD 
  lcd.init();
  lcd.backlight();
  lcd.clear();

  // set pin A0 as input.
  pinMode(analogInput, INPUT);

  // initialize the Serial input 
  Serial.begin(9600);

  // text to screen
  lcd.setCursor(0,0);
  lcd.print("Voltage: ");

  // Create blocks for measurement scale
  lcd.createChar(0, block0);
  lcd.createChar(1, block1);
  lcd.createChar(2, block2);
  lcd.createChar(3, block3);
  lcd.createChar(4, block4);
  lcd.createChar(5, block5);
}

// code that runs over and over again
void loop() 
{
  // read the voltage on pin A0
  measuredValue = analogRead(analogInput);

  // correctly scale the measurement to Volts
  voltage = (measuredValue * maxVoltage) / numLevels;

  // send the voltage value over the serial port
  Serial.println(voltage);
  
  // send the voltage value to the LCD
  lcd.setCursor(9,0);
  lcd.print(String(voltage) + " V");

  // draw measurement scale
  lcd.setCursor(0,1);
  float remainingVoltage = voltage;
  for (int i = 0; i < numChars; i++){
    if (remainingVoltage >= voltagePerChar){

      // full block symbol
      lcd.printByte(5);
      remainingVoltage -= voltagePerChar;

    } else {

      // partial block symbol
      int partialBlock = 5.0 * remainingVoltage / voltagePerChar;
      lcd.printByte(partialBlock); 
      remainingVoltage = 0;
    }

  }
 
  delay(100);
}
