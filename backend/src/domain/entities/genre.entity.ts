interface MovieProps {
  id: number;
  name: string;
}

export class GenreMovieEntity {
  constructor(private readonly props: MovieProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }
}
