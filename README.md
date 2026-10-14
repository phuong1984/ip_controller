# IP controller

Điều khiển robot từ trình duyệt qua WiFi. Trang điều khiển gửi lệnh
HTTP tới robot, robot xử lý trong khối `lặp vô hạn` của chương trình.
Các khối điều khiển servo được cung cấp riêng trong extension
`xbot_servo_controller`.

## Thứ tự khối trong chương trình

```
khi bắt đầu:
    kết nối wifi
    mở máy chủ điều khiển
lặp vô hạn:
    xử lý tín hiệu nhận được
    khi nút ... được ...
    khi cần điều khiển ... được di chuyển
```

Khối `xử lý tín hiệu nhận được` phải nằm **trước** các khối sự kiện trong
`lặp vô hạn`, và phải là lệnh trần (không bọc trong `if`).

## Hàng đợi tín hiệu

Trang điều khiển gửi joystick liên tục, nên nhiều lệnh có thể tới khi
chương trình kịp xử lý. Khối `xử lý tín hiệu nhận được` đọc **hết** các
lệnh đang chờ, tối đa 10 lệnh mỗi lượt, rồi trả về ngay — không treo máy.

Mỗi lệnh được giữ riêng trong hàng đợi. Các khối sự kiện lấy **một lệnh
mỗi lượt** theo đúng thứ tự đến, nên không lệnh nào bị mất.

Một lệnh không khớp khối sự kiện nào sẽ bị bỏ ở lượt kế tiếp, và lệnh mới
vẫn được xử lý bình thường.
