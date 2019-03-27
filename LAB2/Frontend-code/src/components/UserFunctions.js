import axios from 'axios'

export const signup=newUser=>{
    return axios
    .post('users/signup',{
        name:newUser.name,
        email:newUser.email,
        password:newUser.password,
        type:newUser.type,
        gender:newUser.gender,
        phone:newUser.phone,
        city:newUser.city,
        country:newUser.country,
        school:newUser.school,
        company:newUser.company,
        languages:newUser.languages,


        
    })
    .then(res=>{
        console.log("registered");
    })

}

export const login=user=>{
    return axios
    .post('users/login',{
        email:user.email,
        password:user.password
    })
    .then(res=>{
        localStorage.setItem('usertoken',res.data)
        return(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const profile=updateUser=>{
    return axios
    .post('users/profile',{
        name:updateUser.name,
        email:updateUser.email,
        password:updateUser.password,
        type:updateUser.type,
        gender:updateUser.gender,
        phone:updateUser.phone,
        city:updateUser.city,
        country:updateUser.country,
        school:updateUser.school,
        company:updateUser.company,
        languages:updateUser.languages,


        
    })
    .then(res=>{
        console.log("user updated");
    })

}
