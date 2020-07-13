export function createPopUpContent(title, description) {
  return `<mat-card class="example-card">
    <mat-card-header>
      <mat-card-subtitle>${title}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <p>
        ${description}
      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>LIKE</button>
      <button mat-button>SHARE</button>
    </mat-card-actions>
  </mat-card>
  `;
}
