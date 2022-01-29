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
    const response = await this.instance.post<LoginResult>(
      `/admin/login`,
      payload,
    );
    return response.data.data;
  };

  public getRecordings = async (): Promise<Recording[]> => {
    const response = await this.instance.get<QueryResult<Recording>>(
      `/content-manager/collection-types/api::song.song?pageSize=1000&sort=recordedAt:desc`,
    );

    return response.data.results;
  };

  //   public getCharacters = async (): Promise<PickedCharacter[]> => {
  //     const response = await this.instance.get<QueryResult<PickedCharacter>>(
  //       `/character`,
  //     );

  //     const { pages } = response.data.info;

  //     const allCharacters = await Promise.all(
  //       Array.from(Array(pages).keys()).map(page =>
  //         this.instance
  //           .get<QueryResult<PickedCharacter>>(`/character?page=${page + 1}`)
  //           .then(({ data }) => data.results),
  //       ),
  //     );

  //     return allCharacters.flat();
  //   };
}

export default AdminApi;
