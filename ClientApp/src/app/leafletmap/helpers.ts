export function createPopUpContent(title, status, price) {
  return `<mat-card class="example-card">
    <mat-card-header>
      <mat-card-subtitle>${title}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <p>
       status : ${status}
      </p>
      <p>
       price : ${price}
      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>LIKE</button>
      <button mat-button>SHARE</button>
    </mat-card-actions>
  </mat-card>
  `;
}
