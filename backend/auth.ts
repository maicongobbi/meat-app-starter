import {Request, Response} from "express" 
import * as jwt from "jsonwebtoken"

import {apiConfig} from './api-config'

export const handleAuthorization = (req: Request, resp: Response, next) => {
  const token = extractToken(req)
  if(!token){
    resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"')
    resp.status(401).json({message: 'Você precisa se autenticar.'})
    //401 tenta acessar recurso protegido e deve retornar uma header
  }else{
    jwt.verify(token, apiConfig.secret, (error, decoded)=>{
      if(decoded){
        next()
      }else{
        resp.status(403).json({message:'Não autorizado.'})
        //403 - autentic inválida - info válida mas não tem permissão - lógica de aplicação - falha na validacao de senha
      }
    })
  }
}

function extractToken(req: Request): string {
  let token = undefined
  if(req.headers && req.headers.authorization){
    //Autorization: Bearer ZZZ.ZZZ.ZZZ
    const parts: string[] = req.headers.authorization.split(' ')
    if(parts.length === 2 && parts[0] === 'Bearer'){
      token = parts[1]
    }
  }
  return token
}