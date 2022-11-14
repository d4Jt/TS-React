interface Rank<RankItem> {
   item: RankItem;
   rank: number;
}
function ranker<RankItem>(
   items: RankItem[],
   rankCallback: (v: RankItem) => number
): RankItem[] {
   const ranks: Rank<RankItem>[] = items.map(item => ({
      item,
      rank: rankCallback(item),
   }));

   ranks.sort((a, b) =>a.rank - b.rank);
   return ranks.map(rank => rank.item);
} // [1,2,3,4,5,6] (v) => v * 2

// console.log(ranker([1, 2, 3, 4, 5, 6], v => v * 2));

const languages: { name: string; difficulty: number }[] = [
   {
      name: 'React JS',
      difficulty: 3,
   },
   {
      name: 'JavaScript',
      difficulty: 2,
   },
   {
      name: 'Python',
      difficulty: 1,
   },
];

console.log(ranker(languages, ({difficulty}) => difficulty));
