interface TrendingMovieProps {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  mediaType: string;
  adult: boolean;
  originalLanguage: string;
  genreIds: number[];
  popularity: number;
  releaseDate: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

export class TrendingMovieEntity {
  constructor(private readonly props: TrendingMovieProps) {}

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get originalTitle() {
    return this.props.originalTitle;
  }

  get overview() {
    return this.props.overview;
  }

  get posterPath() {
    return this.props.posterPath;
  }

  get backdropPath() {
    return this.props.backdropPath;
  }

  get mediaType() {
    return this.props.mediaType;
  }

  get adult() {
    return this.props.adult;
  }

  get originalLanguage() {
    return this.props.originalLanguage;
  }

  get genreIds() {
    return this.props.genreIds;
  }

  get popularity() {
    return this.props.popularity;
  }

  get releaseDate() {
    return this.props.releaseDate;
  }

  get video() {
    return this.props.video;
  }

  get voteAverage() {
    return this.props.voteAverage;
  }

  get voteCount() {
    return this.props.voteCount;
  }
}
