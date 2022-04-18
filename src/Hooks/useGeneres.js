const useGeneres=(selectedgenre)=>{
        const genereIndex=selectedgenre.map((g)=>g.id)
        if(genereIndex<1) return ""
        return genereIndex.reduce((a,b)=>a+","+b)
    
}           
export  default useGeneres