declare type RecipeOverview = {
  readonly id: number;
  readonly image: string;
  readonly imageType: string;
  readonly likes: number;
  readonly missingIngredients: number;
  readonly title: string;
  readonly usedIngreientCount: number;
};
