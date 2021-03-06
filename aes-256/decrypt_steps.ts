import {mulBy02, mulBy03, mulBy09, mulBy0b, mulBy0d, mulBy0e} from "./multiply"
import {InvSbox, Nb} from "./params"

export function InvShiftRows(state: Uint16Array[]): Uint16Array[] {
	for (var row = 1; row < Nb; row++) {
		let res = new Uint16Array(4);
		for (var col = 0; col < 4; col++ ){
			res[(col+row)%4] = state[row][col]
		}

		state[row] = res
	}

	return state
}

export function InvMixColumns(state: Uint16Array[]): Uint16Array[] {
	for (var row = 0; row < Nb; row++) {
		const s0 = mulBy0e(state[0][row]) ^ mulBy0b(state[1][row]) ^ mulBy0d(state[2][row]) ^ mulBy09(state[3][row])
		const s1 = mulBy09(state[0][row]) ^ mulBy0e(state[1][row]) ^ mulBy0b(state[2][row]) ^ mulBy0d(state[3][row])
		const s2 = mulBy0d(state[0][row]) ^ mulBy09(state[1][row]) ^ mulBy0e(state[2][row]) ^ mulBy0b(state[3][row])
		const s3 = mulBy0b(state[0][row]) ^ mulBy0d(state[1][row]) ^ mulBy09(state[2][row]) ^ mulBy0e(state[3][row])

		state[0][row] = s0
		state[1][row] = s1
		state[2][row] = s2
		state[3][row] = s3
	}

	return state
}

export function InvSubBytes(state: Uint16Array[]): Uint16Array[] {
	for (var i = 0; i < state.length; i++) {
		for (var j = 0; j < state[i].length; j++) {
			const sboxElem = InvSbox[state[i][j]]
			state[i][j] = sboxElem
		}
	}

	return state
}