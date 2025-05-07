interface MovieDetailProps {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  genres: { id: number; name: string }[];
  releaseDate: string;
  runtime: number;
  status: string;
  tagline: string;
  voteAverage: number;
  voteCount: number;
  homepage: string;
  videos?: {
    key: string;
    name: string;
    site: string;
    type: string;
  }[];
  productionCompanies?: {
    id: number;
    name: string;
    logoPath: string | null;
    originCountry: string;
  }[];
}

export class MovieDetailEntity {
  constructor(private readonly props: MovieDetailProps) {}

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

  get genres() {
    return this.props.genres;
  }

  get releaseDate() {
    return this.props.releaseDate;
  }

  get runtime() {
    return this.props.runtime;
  }

  get status() {
    return this.props.status;
  }

  get tagline() {
    return this.props.tagline;
  }

  get voteAverage() {
    return this.props.voteAverage;
  }

  get voteCount() {
    return this.props.voteCount;
  }

  get homepage() {
    return this.props.homepage;
  }

  get videos() {
    return this.props.videos ?? [];
  }

  get productionCompanies() {
    return this.props.productionCompanies ?? [];
  }
}
