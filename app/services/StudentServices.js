export default class MemberServices {
    getMemberList(){
        return axios({
            method: 'get',
            url: 'https://6214ccb089fad53b1f1f676b.mockapi.io/School'
        });
    }
    addMember(Member){
        return axios({
            method: 'post',
            url: 'https://6214ccb089fad53b1f1f676b.mockapi.io/School',
            data: Member
        });
    }
    deleteMember(id){
        return axios({
            method: 'delete',
            url: `https://6214ccb089fad53b1f1f676b.mockapi.io/School/${id}`,
        });
    }
    getMember(id){
        return axios({
            method: 'get',
            url: `https://6214ccb089fad53b1f1f676b.mockapi.io/School/${id}`,
        });
        
    }
}