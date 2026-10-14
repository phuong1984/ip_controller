from ip_controller import *

# Mô tả hàm này...
def dpad_handle():
  global S1_angle_init, S2_angle_init, S3_angle_init, S2_angle_max, S3_angle_max, S1_angle, S2_angle, S1_angle_step, S2_angle_step
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:dpad_up:down":
    robot.forward(50)
    ip_ctrl.clear_signal()
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:dpad_down:down":
    robot.backward(50)
    ip_ctrl.clear_signal()
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:dpad_left:down":
    robot.turn_left(50)
    ip_ctrl.clear_signal()
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:dpad_right:down":
    robot.turn_right(50)
    ip_ctrl.clear_signal()
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:dpad_up:up":
    robot.stop()
    ip_ctrl.clear_signal()
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:dpad_down:up":
    robot.stop()
    ip_ctrl.clear_signal()
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:dpad_left:up":
    robot.stop()
    ip_ctrl.clear_signal()
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:dpad_right:up":
    robot.stop()
    ip_ctrl.clear_signal()

# Mô tả hàm này...
def left_jst_handle():
  global S1_angle_init, S2_angle_init, S3_angle_init, S2_angle_max, S3_angle_max, S1_angle, S2_angle, S1_angle_step, S2_angle_step
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "joy:left" and (ip_ctrl.signal_x() != 0 or ip_ctrl.signal_y() != 0):
    if (ip_ctrl.signal_x()) < -70:
      if S1_angle < 170:
        S1_angle = (S1_angle if isinstance(S1_angle, (int, float)) else 0) + S1_angle_step
        move_servo_position(0, S1_angle_step)
    elif (ip_ctrl.signal_x()) > 70:
      if S1_angle > 10:
        S1_angle = (S1_angle if isinstance(S1_angle, (int, float)) else 0) + -1 * S1_angle_step
        move_servo_position(0, (-1 * S1_angle_step))
    elif (ip_ctrl.signal_y()) < -70:
      if S2_angle < S2_angle_max:
        S2_angle = (S2_angle if isinstance(S2_angle, (int, float)) else 0) + S2_angle_step
        move_servo_position(1, S2_angle_step)
    elif (ip_ctrl.signal_y()) > 70:
      if S2_angle > 30:
        S2_angle = (S2_angle if isinstance(S2_angle, (int, float)) else 0) + -1 * S1_angle_step
        move_servo_position(1, (-1 * S2_angle_step))
    else:
      pass
    ip_ctrl.clear_signal()


S1_angle_init = 90
S2_angle_init = 90
S3_angle_init = 74
S2_angle_max = 130
S3_angle_max = 74
S1_angle_step = 5
S2_angle_step = 5
ip_ctrl.connect_wifi("HUESA", "108108801")
ip_ctrl.start_server(80)
led_onboard.show(1, hex_to_rgb('#00ff00'))
led_onboard.show(2, hex_to_rgb('#00ff00'))
set_servo(0, S1_angle_init)
set_servo(1, S2_angle_init)
set_servo(2, S3_angle_init)
S1_angle = S1_angle_init
S2_angle = S2_angle_init
while True:
  ip_ctrl.process_all()
  dpad_handle()
  left_jst_handle()
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:l1:down":
    set_servo_position(0, S1_angle_init, 70)
    S1_angle = S1_angle_init
    ip_ctrl.clear_signal()
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:l2:down":
    set_servo_position(1, S2_angle_init, 70)
    S2_angle = S2_angle_init
    ip_ctrl.clear_signal()
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:triangle:down":
    set_servo_position(2, S3_angle_init, 70)
    ip_ctrl.clear_signal()
  if ip_ctrl.has_signal() and ip_ctrl.signal_name() == "btn:cross:down":
    set_servo_position(2, S3_angle_max, 70)
    ip_ctrl.clear_signal()


170
