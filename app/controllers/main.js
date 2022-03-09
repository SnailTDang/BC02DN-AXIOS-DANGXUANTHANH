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
    let count = 1;
    let content = data.map(e => {
        count++;
        return `
            <tr>
                <td>${count}</td>
                <td>${e.taiKhoan}</td>
                <td>${e.matKhau}</td>
                <td>
                    <img src="${e.hinhAnh}" alt="" style="width:50px; height: 50px; border-radius: 50%; margin-right: 8px;">
                    <span style="font-weight: 600; font-size: 16px">${e.hoTen}</span>
                </td>
                <td>${e.email}</td>
                <td>${e.ngonNgu}</td>
                <td>${e.loaiND == "GV" ? "Giáo viên" : e.loaiND =="HV" ? "Học viên" : "Chưa xác định"}</td>
                <td>
                    <button class="btn btn-success">Xem</button>
                    <button class="btn btn-danger">Xem</button>
                </td>
            </tr>
        `
    })
    document.querySelector("#tblDanhSachNguoiDung").innerHTML = content.join("");
}