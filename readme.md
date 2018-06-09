### iwe7 layout

| 属性           | 说明       | 默认值                     |
|--------------|----------|-------------------------|
| headerHeight | 头高度      | 45px                    |
| footerHeight | footer高度 | 45px                    |
| pullingDown  | 下拉事件     | `res.finishPullDown();` |
| pullUpLoad   | 上拉事件     | `res.finishPullUp();`   |


```html
<layout-outlet #outlet="layoutOutlet">
  <div header>
    <navbar-outlet #navbar='navbarOutlet'>
      <div navbarLeft (click)="outlet.showMenu('left')">左</div>
      <div navbarTitle>navbar header</div>
      <div navbarRight (click)="outlet.showMenu('right')">右</div>
    </navbar-outlet>
  </div>
  <router-outlet></router-outlet>
  <div footer>
    <navbar-outlet #navbar='navbarOutlet'>
      <div navbarLeft (click)="outlet.showMenu('top')">上</div>
      <div navbarTitle>navbar footer</div>
      <div navbarRight (click)="outlet.showMenu('bottom')">下</div>
    </navbar-outlet>
  </div>
</layout-outlet>
```
