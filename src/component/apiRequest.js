import React from 'react'

const apiRequest = async (api_url="",objdata=null,errmsg = null) => {
    try{
        const response = await fetch(api_url,objdata)
        if(!response.ok) throw Error("Please Reload The Page")
    }
    catch(err){
        errmsg = err.message
    }
    finally{
        return errmsg
    }
}

export default apiRequest