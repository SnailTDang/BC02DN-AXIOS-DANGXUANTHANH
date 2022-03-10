import MemberList from "../services/StudentServices.js";
import Member from "../models/Student.js";
import Validation from "../models/Validation.js";

let memberServ = new MemberList;
let validation = new Validation;

let memberList = [];
memberServ.getMemberList()
.then( result => {
    memberList = result.data
})
.catch(error => {
    console.log(error)
})

let resetNoti = () => {
    let elements = document.querySelectorAll(".modal-body .sp-thongbao")
    for (let ele of elements) {
        ele.style.display = "none";
    }
};

let renderList = (data) => {
    let count = 0;
    let content = data.map(e => {
        count++;
        return `
            <tr>
                <td>${count}</td>
                <td>${e.taiKhoan}</td>
                <td>${e.matKhau}</td>
                <td>
                    <img src="${e.hinhAnh}" alt="" style="width:50px; height: 50px; border-radius: 50%; margin-right: 8px; object-fit: cover;">
                    <span style="font-weight: 600; font-size: 16px">${e.hoTen}</span>
                </td>
                <td>${e.email}</td>
                <td>${e.ngonNgu}</td>
                <td>${e.loaiND == "GV" ? "Giáo viên" : e.loaiND =="HV" ? "Học viên" : "Chưa xác định"}</td>
                <td>
                    <button class="btn btn-success" data-toggle="modal"  data-target="#myModal" onclick="showDetails(${e.id})">Xem</button>
                    <button class="btn btn-danger" onclick="deleteMember(${e.id})">Xóa</button>
                </td>
            </tr>
        `
    })
    document.querySelector("#tblDanhSachNguoiDung").innerHTML = content.join("");
};

let showMember = () => {
    memberServ.getMemberList()
    .then( result => {
        renderList(result.data)
        memberList = result.data
    })
};

showMember();

let addBtn = () => {
    resetNoti();
    document.querySelector("#myModal .modal-footer").innerHTML = `<button class="btn btn-success" onclick="addNewMember()">Thêm người dùng</button>`;
    let formELE = document.querySelectorAll(".modal-body .form-control");
    for(let element of formELE) {
        if(element.id == "loaiNguoiDung" || element.id == "loaiNgonNgu") {
            element.value = "none";
        }
        else {
            element.value = "";
        }
    }
    document.querySelector("#TaiKhoan").disabled = false;
}

window.addBtn = addBtn;


let addNewMember = () => {
    let {TaiKhoan, HoTen, MatKhau, Email, HinhAnh, loaiNguoiDung, loaiNgonNgu, MoTa} = getInfoMem();

    let isValid = checkValidation(TaiKhoan,HoTen,MatKhau,Email,HinhAnh,MoTa);
    if(isValid) {
        let member = new Member(TaiKhoan, HoTen, MatKhau, Email, loaiNguoiDung, loaiNgonNgu, MoTa,  HinhAnh);
        memberServ.addMember(member)
        .then((result) => {
            showMember();
            document.querySelector("#myModal .close").click()
        })
        .catch((error) => { 
            console.log(error)
        })
    }
    
}

window.addNewMember = addNewMember;

let deleteMember = (id) => {
    memberServ.deleteMember(id)
    .then((result) => { 
        showMember();
    })
    .catch((error) => {
        console.log(error)
    })
};

window.deleteMember= deleteMember;

let showDetails = (id) => {
    resetNoti();
    document.querySelector("#myModal .modal-footer").innerHTML = `<button class="btn btn-success" onclick="updateMember(${id})">Cập nhật</button>`;
    memberServ.getMember(id)
    .then(result => {
        let {taiKhoan,hoTen,matKhau,email,loaiND,ngonNgu,moTa,hinhAnh} = result.data;
        document.querySelector("#TaiKhoan").value = taiKhoan;
        document.querySelector("#HoTen").value = hoTen;
        document.querySelector("#MatKhau").value = matKhau;
        document.querySelector("#Email").value = email;
        document.querySelector("#loaiNguoiDung").value = loaiND;
        document.querySelector("#loaiNgonNgu").value = ngonNgu;
        document.querySelector("#MoTa").value = moTa;
        document.querySelector("#HinhAnh").value = hinhAnh;
    })
    .catch(error => console.log(error));
    document.querySelector("#TaiKhoan").disabled = true;
}

window.showDetails  = showDetails;

let updateMember= (id) => {
    let {TaiKhoan, HoTen, MatKhau, Email, HinhAnh, loaiNguoiDung, loaiNgonNgu, MoTa} = getInfoMem();
    let isValid = true;

    isValid &=
    validation.checkEmpty(
        HoTen,
        "tbHoTen",
        "Tên nhân viên không được để trống"
    )
    && validation.checkName(HoTen, "tbHoTen", "Tên nhân viên phải là chữ");
    isValid &= validation.checkEmpty(HinhAnh,"tbHinhAnh","Hình ảnh không được để trống");
    isValid &= validation.checkEmpty(MoTa,"tbMoTa","Mô tả không được để trống")&& validation.checkLong(MoTa,"tbMoTa","Mô tả không được quá 60 ký tự");
    //kiểm tra email: định dạng email
    isValid &= validation.checkEmail(
    Email,
    "tbEmail",
    "Email chưa đúng định dạng"
    )&& validation.checkEmpty(Email,"tbEmail","Email không được để trống");
    //kiểm tra pass: định dạng pass (có 1 ký chư, 1 in hoa, 1 số, 1 đặc biet, độ dài)
    isValid &= validation.checkPass(
        MatKhau,
    "tbMatKhau",
    "Mật khẩu chưa đúng định dạng"
    )&& validation.checkEmpty(MatKhau,"tbMatKhau","Mật khẩu không được để trống") ;
    //kiem tra KH
    isValid &= validation.checkSelect(
    "loaiNgonNgu",
    "tbloaiNgonNgu",
    "Bạn chưa chọn ngôn ngữ"
    );
    isValid &= validation.checkSelect(
    "loaiNguoiDung",
    "tbloaiNguoiDung",
    "Bạn chưa chọn người dùng"
    );

    if(isValid) {
        let member = new Member(TaiKhoan, HoTen, MatKhau, Email, loaiNguoiDung, loaiNgonNgu, MoTa,  HinhAnh);
        memberServ.updateMember(id,member)
        .then((result) => {
            showMember();
            document.querySelector("#myModal .close").click()
        })
        .catch((error) => { 
            console.log(error)
        })
    }
};

let getInfoMem = () => {
    let formELE = document.querySelectorAll(".modal-body .form-control");
    let memberValue = {};
    for(let element of formELE) {
        let idName = element.id;
        let value = element.value;
        memberValue = {...memberValue,[idName]:value};
    }
    let {TaiKhoan, HoTen, MatKhau, Email, HinhAnh, loaiNguoiDung, loaiNgonNgu, MoTa} = memberValue;

    return {TaiKhoan, HoTen, MatKhau, Email, HinhAnh, loaiNguoiDung, loaiNgonNgu, MoTa};
}

window.updateMember = updateMember;


// hiden show pass

let pwShown = 0;

let show = () => {
    let p = document.getElementById("MatKhau");
    p.setAttribute("type", "text");
}

let hide = () => {
    let p = document.getElementById("MatKhau");
    p.setAttribute("type", "password");
    pwShown = 0;
}

document.getElementById("eye").addEventListener(
    "click", () => {
    if (pwShown == 0) {
        pwShown = 1;
        show();
    } else {
        hide();
        pwShown = 0;
    }
    },
    false
);
document.querySelector(".modal-content").addEventListener("mouseleave", hide);

//   CHECK


let checkValidation = (TaiKhoan,HoTen,MatKhau,Email,HinhAnh,MoTa) => {
    let isValid = true;
    isValid &=
    validation.checkEmpty(
    TaiKhoan,
    "tbTaiKhoan",
    "Tài khoản không để trống*"
    ) && validation.checkAcc(TaiKhoan,"tbTaiKhoan","Tài khoản không được trùng", memberList);
    isValid &=
    validation.checkEmpty(
        HoTen,
        "tbHoTen",
        "Tên nhân viên không được để trống"
    )
    && validation.checkName(HoTen, "tbHoTen", "Tên nhân viên phải là chữ");
    isValid &= validation.checkEmpty(HinhAnh,"tbHinhAnh","Hình ảnh không được để trống");
    isValid &= validation.checkEmpty(MoTa,"tbMoTa","Mô tả không được để trống")&& validation.checkLong(MoTa,"tbMoTa","Mô tả không được quá 60 ký tự");
    //kiểm tra email: định dạng email
    isValid &= validation.checkEmail(
    Email,
    "tbEmail",
    "Email chưa đúng định dạng"
    )&& validation.checkEmpty(Email,"tbEmail","Email không được để trống");
    //kiểm tra pass: định dạng pass (có 1 ký chư, 1 in hoa, 1 số, 1 đặc biet, độ dài)
    isValid &= validation.checkPass(
        MatKhau,
    "tbMatKhau",
    "Mật khẩu chưa đúng định dạng"
    )&& validation.checkEmpty(MatKhau,"tbMatKhau","Mật khẩu không được để trống") ;
    //kiem tra KH
    isValid &= validation.checkSelect(
    "loaiNgonNgu",
    "tbloaiNgonNgu",
    "Bạn chưa chọn ngôn ngữ"
    );
    isValid &= validation.checkSelect(
    "loaiNguoiDung",
    "tbloaiNguoiDung",
    "Bạn chưa chọn người dùng"
    );
    return isValid;
}