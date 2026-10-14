const ColorIp = '#44cbc6';

const IP_BUTTONS = [
  [Blockly.Msg.IP_CONTROLLER_BUTTON_DPAD_UP, 'dpad_up'],
  [Blockly.Msg.IP_CONTROLLER_BUTTON_DPAD_DOWN, 'dpad_down'],
  [Blockly.Msg.IP_CONTROLLER_BUTTON_DPAD_LEFT, 'dpad_left'],
  [Blockly.Msg.IP_CONTROLLER_BUTTON_DPAD_RIGHT, 'dpad_right'],
  [Blockly.Msg.IP_CONTROLLER_BUTTON_TRIANGLE, 'triangle'],
  [Blockly.Msg.IP_CONTROLLER_BUTTON_SQUARE, 'square'],
  [Blockly.Msg.IP_CONTROLLER_BUTTON_CIRCLE, 'circle'],
  [Blockly.Msg.IP_CONTROLLER_BUTTON_CROSS, 'cross'],
  ['L1', 'l1'],
  ['L2', 'l2'],
  ['R1', 'r1'],
  ['R2', 'r2'],
  [Blockly.Msg.IP_CONTROLLER_BUTTON_SHARE, 'share'],
  [Blockly.Msg.IP_CONTROLLER_BUTTON_OPTIONS, 'options'],
];

const IP_JOYSTICKS = [
  [Blockly.Msg.IP_CONTROLLER_JOYSTICK_LEFT, 'left'],
  [Blockly.Msg.IP_CONTROLLER_JOYSTICK_RIGHT, 'right'],
];

const IP_BUTTON_STATES = [
  [Blockly.Msg.IP_CONTROLLER_BUTTON_PRESSED, 'down'],
  [Blockly.Msg.IP_CONTROLLER_BUTTON_RELEASED, 'up'],
];

const IP_IMPORT = 'from ip_controller import *';


// Than cua khoi 'if' trong khoi su kien.
// statementToCode da thu t le san bang prefixLines. Blockly.Python.PASS cung da
// thu t le san (Python generator gan PASS = INDENT + "pass\n").
// Giong het cach core lam: statementToCode(...) || Blockly.Python.PASS
function ipStatementBody(statements) {
  return statements || Blockly.Python.PASS;
}

// Dong lenh noi sau than, phai thu t le sang cung cap voi khoi 'if'.
// Core lam y vay cho STATEMENT_SUFFIX: prefixLines(suffix, INDENT).
function ipStatementTail(line) {
  return Blockly.Python.prefixLines(line, Blockly.Python.INDENT);
}

// Điều kiện chung cho các khối sự kiện: có tín hiệu mới và tên tín hiệu khớp
function ipSignalCheck(expected) {
  return 'ip_ctrl.has_signal() and ip_ctrl.signal_name() == "' + expected + '"';
}

function ipDeclareImport() {
  Blockly.Python.definitions_['import_ip_controller'] = IP_IMPORT;
}

// ============ KẾT NỐI ============

Blockly.Blocks['ip_connect_wifi'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_connect_wifi",
        "message0": Blockly.Msg.IP_CONTROLLER_CONNECT_WIFI_MESSAGE,
        "args0": [
          {
            type: "field_input",
            name: "SSID",
            text: "",
          },
          {
            type: "field_input",
            name: "PASS",
            text: "",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_CONNECT_WIFI_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_connect_wifi"] = function (block) {
  ipDeclareImport();
  var ssid = block.getFieldValue('SSID');
  var pass = block.getFieldValue('PASS');
  // TODO: Assemble Python into code variable.
  var code = "ip_ctrl.connect_wifi(" + JSON.stringify(ssid) + ", " + JSON.stringify(pass) + ")\n";
  return code;
};

Blockly.Blocks['ip_start_server'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_start_server",
        "message0": Blockly.Msg.IP_CONTROLLER_START_SERVER_MESSAGE,
        "args0": [
          {
            "type": "input_value",
            "name": "port",
            "check": "Number",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_START_SERVER_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_start_server"] = function (block) {
  ipDeclareImport();
  var port = Blockly.Python.valueToCode(block, 'port', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "ip_ctrl.start_server(" + port + ")\n";
  return code;
};

Blockly.Blocks['ip_is_connected'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_is_connected",
        "message0": Blockly.Msg.IP_CONTROLLER_IS_CONNECTED_MESSAGE,
        "args0": [],
        "output": "Boolean",
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_IS_CONNECTED_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_is_connected"] = function (block) {
  ipDeclareImport();
  // TODO: Assemble Python into code variable.
  var code = 'ip_ctrl.is_connected()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['ip_get_ip'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_get_ip",
        "message0": Blockly.Msg.IP_CONTROLLER_GET_IP_MESSAGE,
        "args0": [],
        "output": "String",
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_GET_IP_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_get_ip"] = function (block) {
  ipDeclareImport();
  // TODO: Assemble Python into code variable.
  var code = 'ip_ctrl.get_ip()';
  return [code, Blockly.Python.ORDER_NONE];
};

// ============ TÍN HIỆU ============

Blockly.Blocks['ip_process'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_process",
        "message0": Blockly.Msg.IP_CONTROLLER_PROCESS_MESSAGE,
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_PROCESS_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_process"] = function (block) {
  ipDeclareImport();
  return "ip_ctrl.process_all()\n";
};

Blockly.Blocks['ip_has_signal'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_has_signal",
        "message0": Blockly.Msg.IP_CONTROLLER_HAS_SIGNAL_MESSAGE,
        "args0": [],
        "output": "Boolean",
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_HAS_SIGNAL_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_has_signal"] = function (block) {
  ipDeclareImport();
  // TODO: Assemble Python into code variable.
  var code = 'ip_ctrl.has_signal()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['ip_signal_name'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_signal_name",
        "message0": Blockly.Msg.IP_CONTROLLER_SIGNAL_NAME_MESSAGE,
        "args0": [],
        "output": "String",
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_SIGNAL_NAME_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_signal_name"] = function (block) {
  ipDeclareImport();
  // TODO: Assemble Python into code variable.
  var code = 'ip_ctrl.signal_name()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['ip_signal_x'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_signal_x",
        "message0": Blockly.Msg.IP_CONTROLLER_SIGNAL_X_MESSAGE,
        "args0": [],
        "output": "Number",
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_SIGNAL_X_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_signal_x"] = function (block) {
  ipDeclareImport();
  // TODO: Assemble Python into code variable.
  var code = 'ip_ctrl.signal_x()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['ip_signal_y'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_signal_y",
        "message0": Blockly.Msg.IP_CONTROLLER_SIGNAL_Y_MESSAGE,
        "args0": [],
        "output": "Number",
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_SIGNAL_Y_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_signal_y"] = function (block) {
  ipDeclareImport();
  // TODO: Assemble Python into code variable.
  var code = 'ip_ctrl.signal_y()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['ip_clear_signal'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_clear_signal",
        "message0": Blockly.Msg.IP_CONTROLLER_CLEAR_SIGNAL_MESSAGE,
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_CLEAR_SIGNAL_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_clear_signal"] = function (block) {
  ipDeclareImport();
  // TODO: Assemble Python into code variable.
  var code = "ip_ctrl.clear_signal()\n";
  return code;
};

// ============ SỰ KIỆN ============

Blockly.Blocks['ip_on_button'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_on_button",
        "message0": Blockly.Msg.IP_CONTROLLER_ON_BUTTON_MESSAGE,
        "args0": [
          {
            type: "field_dropdown",
            name: "BUTTON",
            options: IP_BUTTONS,
          },
          {
            type: "field_dropdown",
            name: "STATE",
            options: IP_BUTTON_STATES,
          }
        ],
        "message1": "%1",
        "args1": [
          {
            type: "input_statement",
            name: "DO",
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_ON_BUTTON_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_on_button"] = function (block) {
  ipDeclareImport();
  var button = block.getFieldValue('BUTTON');
  var state = block.getFieldValue('STATE');
  var statements = Blockly.Python.statementToCode(block, 'DO');
  // TODO: Assemble Python into code variable.
  var code = "if " + ipSignalCheck("btn:" + button + ":" + state) + ":\n";
  code += ipStatementBody(statements) + ipStatementTail("ip_ctrl.clear_signal()\n");
  return code;
};

Blockly.Blocks['ip_on_joystick_move'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_on_joystick_move",
        "message0": Blockly.Msg.IP_CONTROLLER_ON_JOYSTICK_MOVE_MESSAGE,
        "args0": [
          {
            type: "field_dropdown",
            name: "JOY",
            options: IP_JOYSTICKS,
          }
        ],
        "message1": "%1",
        "args1": [
          {
            type: "input_statement",
            name: "DO",
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_ON_JOYSTICK_MOVE_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_on_joystick_move"] = function (block) {
  ipDeclareImport();
  var joy = block.getFieldValue('JOY');
  var statements = Blockly.Python.statementToCode(block, 'DO');
  // TODO: Assemble Python into code variable.
  var code = "if " + ipSignalCheck("joy:" + joy) + " and (ip_ctrl.signal_x() != 0 or ip_ctrl.signal_y() != 0):\n";
  code += ipStatementBody(statements) + ipStatementTail("ip_ctrl.clear_signal()\n");
  return code;
};

Blockly.Blocks['ip_on_joystick_center'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_on_joystick_center",
        "message0": Blockly.Msg.IP_CONTROLLER_ON_JOYSTICK_CENTER_MESSAGE,
        "args0": [
          {
            type: "field_dropdown",
            name: "JOY",
            options: IP_JOYSTICKS,
          }
        ],
        "message1": "%1",
        "args1": [
          {
            type: "input_statement",
            name: "DO",
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_ON_JOYSTICK_CENTER_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_on_joystick_center"] = function (block) {
  ipDeclareImport();
  var joy = block.getFieldValue('JOY');
  var statements = Blockly.Python.statementToCode(block, 'DO');
  // TODO: Assemble Python into code variable.
  var code = "if " + ipSignalCheck("joy:" + joy) + " and ip_ctrl.signal_x() == 0 and ip_ctrl.signal_y() == 0:\n";
  code += ipStatementBody(statements) + ipStatementTail("ip_ctrl.clear_signal()\n");
  return code;
};

Blockly.Blocks['ip_on_ping'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "ip_on_ping",
        "message0": Blockly.Msg.IP_CONTROLLER_ON_PING_MESSAGE,
        "args0": [],
        "message1": "%1",
        "args1": [
          {
            type: "input_statement",
            name: "DO",
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorIp,
        "tooltip": Blockly.Msg.IP_CONTROLLER_ON_PING_TOOLTIP,
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["ip_on_ping"] = function (block) {
  ipDeclareImport();
  var statements = Blockly.Python.statementToCode(block, 'DO');
  // TODO: Assemble Python into code variable.
  var code = "if " + ipSignalCheck("ping") + ":\n";
  code += ipStatementBody(statements) + ipStatementTail("ip_ctrl.clear_signal()\n");
  return code;
};
