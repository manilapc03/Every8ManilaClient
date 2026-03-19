export interface NUsersLoginHistoryModel {
    tran_no: number;
    uid: number;
    chihou_id: number;
    provider: string;
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiryTime: Date;
    hostName: string;
    iPAddress: string;
    create_date: Date;
}
