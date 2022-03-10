export default class Validation {
    checkEmpty (value, spanID, message) {
        //kiểm tra rỗng
        if (value.trim() == "") {
            //giá trị bị rỗng => không hợp lệ
            //=> thông báo lỗi
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }

        //hợp lệ => xóa và ẩn câu thông báo
        document.getElementById(spanID).innerHTML = "";
        document.getElementById(spanID).style.display = "none";
        return true;
    };
    checkAcc (value, spanID, message, mangNV) {
        //giả sử ID chưa có trong mangSV
        let isExist = false;
        /** kiểm chứng
        *map() => trả về 1 mảng mới, đ hết mảng mới dừng bất chấp có return hay không
         *some(): => dựa vào điều kiện so sanh trả về kết quả true/false
         *khi duyệt mảng nếu tìm thấy sv dầu tiên nào trong mảng bị trùng id thì return về true và dừng duyệt mảng */
        isExist = mangNV.some((nv, index) => {
            // return kết quả của biểu thức so sánh
            //trim(): xóa ký tự khoảng trắng trước và sau của chuỗi chữ 
            //=> vd:"  SV001   ".trim() => "SV001"
            console.log(nv.taiKhoan)
            return value.trim() == nv.taiKhoan;
        });
        
        if (isExist) {
            //có id bị trùng => không hợp lệ
            document.getElementById(spanID).innerHTML = message + "*";
            document.getElementById(spanID).style.display = "block";
            return false;
        }
        //hợp lệ
        document.getElementById(spanID).innerHTML = "";
        document.getElementById(spanID).style.display = "none"
        return true;
    };
    checkName (value, spanID, message) {
        let pattern = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
        let reg = new RegExp(pattern);
        if (reg.test(value)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message + "*";
        document.getElementById(spanID).style.display = "block";
        return false;
    }
    checkEmail (value, spanID, message) {
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(pattern)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message + "*";
        document.getElementById(spanID).style.display = "block";
        return false;
    }
    checkPass (value, spanID, message) {
        let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if (value.match(pattern)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message + "*";
        document.getElementById(spanID).style.display = "block";
        return false;
    }
    checkSelect (selectID, spanID, message) {
        let index = document.getElementById(selectID).selectedIndex;
        if (index != 0) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message + "*";
        document.getElementById(spanID).style.display = "block";
        return false;
    }
    checkLong (value, spanID, message) {
        let long = value.length;
        if(long < 60) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
              
        } else {
            document.getElementById(spanID).innerHTML = message + "*";
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }
}