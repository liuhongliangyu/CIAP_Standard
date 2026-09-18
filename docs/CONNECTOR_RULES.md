# Connector Rules


Connector responsibility:

- Protocol conversion
- Authentication
- Data mapping
- Health monitoring


Connector does NOT:

- Execute production logic
- Decide scheduling
- Change domain directly


Example:


OPC UA

↓

OPC Connector

↓

Machine State Event

↓

Operational State
