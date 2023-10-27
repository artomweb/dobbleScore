function mouseInside(mx, my, x, y, w, h) {
  return mx > x - w && mx < x + w && my > y - h && my < y + h;
}
