interface Settings {
    host: string;
  }
  
  export const settings: Settings = {
    host: 'http://localhost:3030'
  };
  
  interface RequestOptions {
    method: string;
    headers: Record<string, string>;
    body?: string;
  }
  
  async function request(url: string, options: RequestOptions): Promise<any> {
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      try {
        const data = await response.json();
        return data;
      } catch (err) {
        return response;
      }
    } catch (err: any) {
      console.error(err.message);
      throw err;
    }
  }
  
  function getOptions(method: string = 'get', body?: any): RequestOptions {
    const options: RequestOptions = {
      method,
      headers: {}
    };
  
    const token = sessionStorage.getItem('authToken');
    if (token !== null) {
      options.headers['X-Authorization'] = token;
    }
  
    if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }
  
    return options;
  }
  
  export async function get(url: string): Promise<any> {
    return await request(url, getOptions());
  }
  
  export async function post(url: string, data: any): Promise<any> {
    return await request(url, getOptions('post', data));
  }
  
  export async function put(url: string, data: any): Promise<any> {
    return await request(url, getOptions('put', data));
  }
  
  export async function patch(url: string, data: any): Promise<any> {
    return await request(url, getOptions('PATCH', data));
  }
  
  export async function del(url: string): Promise<any> {
    return await request(url, getOptions('delete'));
  }
  
  export async function login(email: string, password: string): Promise<any> {
    const result = await post(`${settings.host}/users/login`, { email, password });
  
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
  
    return result;
  }
  
  export async function register(username: string, email: string, password: string): Promise<any> {
    const result = await post(`${settings.host}/users/register`, { username, email, password });
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('username', result.username);
  
    return result;
  }
  
  export async function logout(): Promise<any> {
    const result = await get(`${settings.host}/users/logout`);
  
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
  
    return result;
  }
  
  export const requestFactory = (token?: string): void => {
    let serializedAuth;
  
    if (!token) {
      serializedAuth = sessionStorage.getItem('auth');
    }
  
    if (serializedAuth) {
      const auth = JSON.parse(serializedAuth);
      token = auth.accessToken;
    }
  
    // Rest of your logic for requestFactory
  };
  