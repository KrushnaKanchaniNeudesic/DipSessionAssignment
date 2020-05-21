
export interface IAzureCogService{
    TranlateText(langId: string, text: string);
    Textanlytics(text: string);
    ReadOcrImage(stream);
    MatchFace(persongroupId: string, url: string);
    CreatePersonGroup(personGroupId: string);
    AddPersonIntoPersonGroup(personGroupId: string, perosnName: string, url: string),
    AnalyzeForm(url: string),
    AnalyzeFormGetResult(url: string)
}