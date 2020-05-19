
export interface IAzureCogService{
    TranlateText(langId: string, text: string);
    Textanlytics(text: string);
}