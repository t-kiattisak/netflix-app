interface MovieProps {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  releaseDate: string;
  originalTitle?: string;
  overview?: string;
  backdropPath: string;
  match: number;
  voteAverage: number;
  genreIds: number[];
}

export class MovieEntity {
  constructor(private readonly props: MovieProps) {}

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get posterUrl() {
    return this.props.posterUrl;
  }

  get rating() {
    return this.props.rating;
  }

  get releaseDate() {
    return this.props.releaseDate;
  }

  get originalTitle() {
    return this.props.originalTitle;
  }

  get overview() {
    return this.props.overview;
  }

  get backdropPath() {
    return this.props.backdropPath;
  }

  get match() {
    return this.props.match;
  }

  get voteAverage() {
    return this.props.voteAverage;
  }

  get genreIds() {
    return this.props.genreIds;
  }
}
