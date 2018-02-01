export class StarWarsService {
  private characters = [
    {name: 'Ioda', side: ''},
    {name: 'Luke Skywalker', side: ''},
    {name: 'Darth Vader', side: ''}
  ];

  getCharacters(side) {
    if (side === 'all') {
      return [...this.characters];
    }
    const filterByChosenSide = char => char.side === side;
    return this.characters.filter(filterByChosenSide);
  }
}
