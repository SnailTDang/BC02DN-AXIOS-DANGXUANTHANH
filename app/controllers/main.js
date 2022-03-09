import MemberList from "../services/StudentServices.js";
import Member from "../models/Student.js";

let memberServ = new MemberList;

let showMember = () => {
    memberServ.getMemberList()
    .then( result => {
        console.log(result.data)
        renderList(result.data)
    })
    .catch(error => {
        console.log(error)
    })
}

showMember();

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
}

let addBtn = () => {
    document.querySelector("#myModal .modal-footer").innerHTML = `<button class="btn btn-success" onclick="addNewMember()">Thêm người dùng</button>`;
    let formELE = document.querySelectorAll(".modal-body .form-control");
    for(let element of formELE) {
        element.value = "";
    }
}

window.addBtn = addBtn;

let addNewMember = () => {
    let formELE = document.querySelectorAll(".modal-body .form-control");
    let memberValue = {};
    for(let element of formELE) {
        let idName = element.id;
        let value = element.value;
        memberValue = {...memberValue,[idName]:value};
    }
    let {TaiKhoan, HoTen, MatKhau, Email, HinhAnh, loaiNguoiDung, loaiNgonNgu, MoTa} = memberValue;
    let member = new Member(TaiKhoan, HoTen, MatKhau, Email, loaiNguoiDung, loaiNgonNgu, MoTa,  HinhAnh);

    memberServ.addMember(member)
    .then((result) => {
        showMember();
        document.querySelector("#myModal .close").click()
        console.log(memberValue)
    })
    .catch((error) => { 
        console.log(error)
    })
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
}

window.deleteMember= deleteMember;

let showDetails = (id) => {
    memberServ.getMember(id)
    .then(result => {
        let {taiKhoan,hoTen,matKhau,email,loaiND,ngonNgu,moTa,hinhAnh} = result.data;
        document.querySelector("#TaiKhoan").value = taiKhoan;
        document.querySelector("#HoTen").value = hoTen;
        document.querySelector("#MatKhau").value = matKhau;
        document.querySelector("#Email").value = email;
        document.querySelector("#loaiNguoiDung").value = loaiND;
        document.querySelector("#loaiNgonNgu").value = ngonNgu;
        document.querySelector("#MoTa").value = hinhAnh;
        document.querySelector("#HinhAnh").value = moTa;
    })
    .catch(error => console.log(error))
}

window.showDetails  = showDetails;