export default class MemberServices {
    getMemberList(){
        return axios({
            method: 'get',
            url: 'https://6214ccb089fad53b1f1f676b.mockapi.io/School'
        });
    }
    addMember(member){
        return axios({
            method: 'post',
            url: 'https://6214ccb089fad53b1f1f676b.mockapi.io/School',
            data: member
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