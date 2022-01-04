import { ClientOptions, server, serverReturn } from './utils/types'
import axios, { AxiosError } from 'axios';

export class ArchiveClient {
    private clientID: string;
    private token: string;
    private BaseUrl: string;
    /**
     *
     * Constructs an instance of NCPClient.
     *
     * @param clientID 봇의 clientID 아이디
     *
     * @param token 봇의 Archive 토큰
     *
     */
    constructor(ClientOptions: ClientOptions) {
       const { token, clientID } = ClientOptions;
       this.clientID = clientID;
       this.token = token;
       this.BaseUrl = `https://archiver.me/api`;
    }
    /**
   *
   * 서버수를 업데이트 하는 함수
   *
   * @param servers 업데이트 할 서버 수
   *
   * @returns Promise with code(boolean), data(string)
   *
   */
  public async update(servers: number): Promise<serverReturn> {
    if (Number.isInteger(servers) == false) {
        console.log('\x1b[33m%s\x1b[0m', '[Archive Clinet]', '\x1b[0m', '서버수는 정수만 입력가능합니다');
        return {
            code: false,
            data: '서버수는 정수만 입력가능합니다'
        }
    }
    if(!this.token) {
        console.log('\x1b[33m%s\x1b[0m', '[Archive Clinet]', '\x1b[0m', '토큰 값을 입력해주세요');
        return {
            code: false,
            data: '토큰 값을 입력해주세요'
        }
    }
    try {
      let response = await axios({
        method: 'POST',
        url: `${this.BaseUrl}/bot/${encodeURI(this.clientID)}/server`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'authentication': encodeURI(this.token)
        },
        data: {
          server: servers.toString()
        },
      });
      if (response.status === 202 || response.status === 200) {
        if(response.data.code == false) {
            console.log('\x1b[33m%s\x1b[0m', '[Archive Clinet]', '\x1b[0m', response.data.data);
            return {
                code: false,
                data: response.data.data
            }
        }
        return {
            code: true,
            data: response.data.data
        };
      } else {
        console.log('\x1b[33m%s\x1b[0m', '[Archive Clinet]', '\x1b[0m', response.data.data);
        return {
            code: false,
            data: response.data.data
        };
      };
    } catch (error: any) {
        if(!error.response.data.data) {
            console.log('\x1b[33m%s\x1b[0m', '[Archive Clinet]', '\x1b[0m', error.response.data);
            return {
                code: false,
                data: error.response.data
            };    
        }
        console.log('\x1b[33m%s\x1b[0m', '[Archive Clinet]', '\x1b[0m', error.response.data.data);
        return {
            code: false,
            data: error.response.data.data
        };
    }
  }
};