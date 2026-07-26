/**
 * Sprite sheet thú cưng lấy trực tiếp từ /asset01.
 *
 * Mọi sheet trong asset01 đều là ảnh 1536x1872 = lưới 8 cột x 9 hàng
 * (frame 192x208). Con số `frameWidth/columns/rows` trong vài file pet.json
 * ghi 128x128 / 8x8 — sai so với ảnh thật, nên grid được khai báo cứng ở đây
 * và background-position tính bằng % để không phụ thuộc kích thước render.
 */
import corgiSheet from '../../asset01/beta-corgi-d466d95e/spritesheet.webp';
import dioSheet from '../../asset01/dio-2/spritesheet.webp';
import chedaSheet from '../../asset01/chedarini/spritesheet.webp';

export const SHEET_COLS = 8;
export const SHEET_ROWS = 9;
/** Tỉ lệ cao/rộng của một frame (208/192). */
export const FRAME_RATIO = 208 / 192;

// Bảng animation copy từ asset01/<pet>/pet.json
const CORGI_ANIMS = {
  idle:       { frames: [0, 1, 2, 3, 4, 5], fps: 6, loop: true },
  walk_right: { frames: [8, 9, 10, 11, 12, 13, 14, 15], fps: 12, loop: true },
  walk_left:  { frames: [16, 17, 18, 19, 20, 21, 22, 23], fps: 12, loop: true },
  wave:       { frames: [24, 25, 26, 27], fps: 8, loop: false },
  sleep:      { frames: [40, 41, 42, 43, 44, 45, 46, 47], fps: 4, loop: true },
};

const DIO_ANIMS = {
  idle:       { frames: [0, 1, 2, 3], fps: 6, loop: true },
  walk_right: { frames: [8, 9, 10, 11], fps: 10, loop: true },
  walk_left:  { frames: [16, 17, 18, 19], fps: 10, loop: true },
  wave:       { frames: [24, 25], fps: 8, loop: false },
  sleep:      { frames: [32, 33, 34, 35, 36, 37, 38, 39], fps: 4, loop: true },
  eat:        { frames: [48, 49, 50, 51], fps: 8, loop: false },
  play:       { frames: [56, 57, 58, 59, 60, 61], fps: 12, loop: true },
  jump:       { frames: [64, 65, 66, 67, 68, 69], fps: 12, loop: false },
};

/**
 * Sheet chỉ được tải khi có component thật sự set background-image, nên khai
 * báo cả ba ở đây không tốn băng thông của lần tải trang đầu.
 */
export const petSprites = {
  mochi: { id: 'mochi', name: 'Mochi', breed: 'Corgi',       url: corgiSheet, anims: CORGI_ANIMS },
  milo:  { id: 'milo',  name: 'Milo',  breed: 'Mèo Anh Short', url: dioSheet,   anims: DIO_ANIMS },
  beta:  { id: 'beta',  name: 'Beta',  breed: 'Corgi',       url: chedaSheet, anims: CORGI_ANIMS },
};

/** Vị trí background của một frame, tính theo % nên co giãn tùy ý. */
export function framePosition(frame) {
  const col = frame % SHEET_COLS;
  const row = Math.floor(frame / SHEET_COLS);
  return `${(col * 100) / (SHEET_COLS - 1)}% ${(row * 100) / (SHEET_ROWS - 1)}%`;
}
