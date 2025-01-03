import commonApi from "./commonApi"
import SERVER_URL from "./serverUrl"



//registerAPI called by Auth component when user click register btn

export const registerAPI = async (reqBody)=>{
return await commonApi("POST",`${SERVER_URL}/register`,reqBody)


}

//loginAPI called by Auth component when user click register btn

export const loginApi = async (reqBody)=>{
    return await commonApi("POST",`${SERVER_URL}/login`,reqBody)
    
    
    }
//addProjectAPI called by add component when user click add button add project
    export const addProjectAPI = async (reqBody,reqHeader)=>{
        return await commonApi("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
        
        
        }

//getHomeProjectApi called by home component when page loaded in browser(useeffect)

export const getHomeProjectAPI=async()=>{
    return await commonApi("GET",`${SERVER_URL}/home-project`,{})
}




//allProjectAPI :called by project component when page loaded i browser (useEffect)

export const allProjectAPI=async(searchKey,reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}


//allProjectAPI :called by project component when page loaded i browser (useEffect)

export const userProjectAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/user-projects`,{},reqHeader)
}

//updateProjectAPI :called by edit component when user click update btn projects/6768094754dbb642b14058a2
export const updateProjectAPI=async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

//userProjectRemoveAPI :called by view component when user delete btn clicked
export const userProjectRemoveAPI=async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}


//updateUsertAPI :called by profile component when user click update btn edit-user
export const updateUserAPI=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}
