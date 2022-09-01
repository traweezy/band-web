import HttpClient from './http-client';

class AdminApi extends HttpClient {
  private static instance: AdminApi;

  public constructor() {
    super('https://envoys-cms.herokuapp.com');
  }

  public static getInstance(): AdminApi {
    if (!AdminApi.instance) {
      AdminApi.instance = new AdminApi();
    }

    return AdminApi.instance;
  }

  public postLogin = async (payload: LoginPayload) => {
    const response = await this.instance.post<LoginResult>('/admin/login', payload, {
      headers: { authorization: `Bearer ${window.localStorage.jwt_token}` },
    });
    return response.data.data;
  };

  public getRecordings = async (): Promise<Recording[]> => {
    const response = await this.instance.get<QueryResult<Recording>>(
      '/content-manager/collection-types/api::song.song?pageSize=1000&sort=recordedAt:desc',
      { headers: { authorization: `Bearer ${window.localStorage.jwt_token}` } },
    );

    return response.data.results;
  };

  public getTabs = async (): Promise<Tab[]> => {
    const response = await this.instance.get<QueryResult<Tab>>(
      '/content-manager/collection-types/api::tab.tab?pageSize=1000&sort=updatedAt:desc',
      { headers: { authorization: `Bearer ${window.localStorage.jwt_token}` } },
    );

    return response.data.results;
  };

  public getLyrics = async (): Promise<Lyrics[]> => {
    const response = await this.instance.get<QueryResult<Tab>>(
      '/content-manager/collection-types/api::lyric.lyric?pageSize=1000&sort=updatedAt:desc',
      { headers: { authorization: `Bearer ${window.localStorage.jwt_token}` } },
    );

    return response.data.results;
  };

  public getEvents = async (): Promise<Event[]> => {
    const response = await this.instance.get<QueryResult<Event>>(
      '/content-manager/collection-types/api::event.event?pageSize=1000&sort=updatedAt:desc',
      { headers: { authorization: `Bearer ${window.localStorage.jwt_token}` } },
    );

    return response.data.results;
  };

  public getImages = async (): Promise<Image[]> => {
    const response = await this.instance.get<QueryResult<Tab>>(
      '/content-manager/collection-types/api::image.image?pageSize=1000&sort=updatedAt:desc',
      { headers: { authorization: `Bearer ${window.localStorage.jwt_token}` } },
    );

    return response.data.results;
  };

  public postLyrics = async (payload: Partial<Lyrics>): Promise<void> => {
    await this.instance.post<Partial<Lyrics>>('/content-manager/collection-types/api::lyric.lyric', payload, {
      headers: { authorization: `Bearer ${window.localStorage.jwt_token}` },
    });
  };

  public postTab = async (payload: Partial<Tab>): Promise<void> => {
    await this.instance.post<Partial<Tab>>('/content-manager/collection-types/api::tab.tab', payload, {
      headers: { authorization: `Bearer ${window.localStorage.jwt_token}` },
    });
  };

  public postRecording = async (payload: Partial<Recording>): Promise<void> => {
    await this.instance.post<Partial<Recording>>('/content-manager/collection-types/api::song.song', payload, {
      headers: { authorization: `Bearer ${window.localStorage.jwt_token}` },
    });
  };

  public postImage = async (payload: Partial<Image>): Promise<void> => {
    await this.instance.post<Partial<Image>>('/content-manager/collection-types/api::image.image', payload, {
      headers: { authorization: `Bearer ${window.localStorage.jwt_token}` },
    });
  };

  public postEvent = async (payload: Partial<Event>): Promise<void> => {
    await this.instance.post<Partial<Event>>('/content-manager/collection-types/api::event.event', payload, {
      headers: { authorization: `Bearer ${window.localStorage.jwt_token}` },
    });
  };

  public deleteLyrics = async (id: number): Promise<void> => {
    await this.instance.delete<Partial<Lyrics>>(`/content-manager/collection-types/api::lyric.lyric/${id}`, {
      headers: { authorization: `Bearer ${window.localStorage.jwt_token}` },
    });
  };

  public deleteTab = async (id: number): Promise<void> => {
    await this.instance.delete<Partial<Tab>>(`/content-manager/collection-types/api::tab.tab/${id}`, {
      headers: { authorization: `Bearer ${window.localStorage.jwt_token}` },
    });
  };

  public deleteRecording = async (id: number): Promise<void> => {
    await this.instance.delete<Partial<Recording>>(`/content-manager/collection-types/api::song.song/${id}`, {
      headers: { authorization: `Bearer ${window.localStorage.jwt_token}` },
    });
  };

  public deleteEvent = async (id: number): Promise<void> => {
    await this.instance.delete<Partial<Event>>(`/content-manager/collection-types/api::event.event/${id}`, {
      headers: { authorization: `Bearer ${window.localStorage.jwt_token}` },
    });
  };

  public deleteImage = async (id: number): Promise<void> => {
    await this.instance.delete<Partial<Image>>(`/content-manager/collection-types/api::image.image/${id}`, {
      headers: { authorization: `Bearer ${window.localStorage.jwt_token}` },
    });
  };
}

export default AdminApi;
