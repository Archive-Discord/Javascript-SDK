const axios = require('axios');
import { ArchiveClient } from '../client';

jest.mock('axios');

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOjkyNDI4NDM2MDU2MjIwODgwOSwibGFzdFVwZGF0ZSI6MTY0MTE3NjUzMi40NTM4MTI2fQ.riNjL9dsxfKWb49rqp3ldkDtudzGPAAkcwIB-gSM2ZE';
const clientID = '924284360562208809';

describe('Archive Client', () => {
    var Archive: ArchiveClient;

    beforeEach(() => axios.mockClear());
    beforeAll(() => {
        Archive = new ArchiveClient({
            clientID: clientID,
            token: token
        });
    });

    test('create Archive Client', () => {
        expect(
          () =>
            new ArchiveClient({
                clientID: clientID,
                token: token
            })
        ).not.toThrow();
      });

    test('update servers', async () => {
      const { code, data } = await Archive.update(10)
    });
})