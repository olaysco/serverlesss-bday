import Axios, { AxiosResponse } from "axios";
import { createLogger } from "@libs/logger";


const logger = createLogger('authService')
let cachedCertificate: string

const authorizer =  async (jwksUrl: string): Promise<string> => {
    if (cachedCertificate) return cachedCertificate
    try {
        const result: AxiosResponse = await Axios.get(jwksUrl)
        const keys = result.data.keys;

        const signingKeys = keys.filter(
            key => key.use === 'sig'
                    && key.kty === 'RSA'
                    && key.alg === 'RS256'
                    && key.kid          
                    && (key.x5c && key.x5c.length) 
            )
        
         if (!signingKeys.length)
            throw new Error('No JWKS signing keys found')
        
        const key = signingKeys[0]
        const pub = key.x5c[0]  

        cachedCertificate = certToPEM(pub)
        return cachedCertificate;

    } catch (error) {
        logger.error(error);
    }
}

function certToPEM(cert: string): string {
  cert = cert.match(/.{1,64}/g).join('\n')
  cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`
  return cert
}

export { authorizer }