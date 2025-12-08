export default async (req) => {
  const {url,user,pass} = await req.json();
  const r = await fetch(url,{
    method:'PROPFIND',
    headers:{
      'Authorization':'Basic '+btoa(user+':'+pass),
      'Depth':'1','Content-Type':'application/xml'
    },
    body:' '
  });
  return new Response(r.body,{status:r.status,headers:{'Access-Control-Allow-Origin':'*'}});
};
