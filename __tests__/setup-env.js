import {server} from './server.js'

beforeAll(() => server.listen())
beforeEach(() => server.resetHandlers())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())