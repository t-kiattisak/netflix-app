export class MovieEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly posterUrl: string,
    public readonly rating: number,
    public readonly releaseYear: string,
  ) {}
}
