/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable @typescript-eslint/ban-types */
import * as $wcm from '@vscode/wasm-component-model';
import type { u32, i32 } from '@vscode/wasm-component-model';

export namespace Types {
	export type Operands = {
		left: u32;
		right: u32;
	};

	export namespace Operation {
		export const add = 'add' as const;
		export type Add = { readonly tag: typeof add; readonly value: Operands } & _common;
		export function Add(value: Operands): Add {
			return new VariantImpl(add, value) as Add;
		}

		export const sub = 'sub' as const;
		export type Sub = { readonly tag: typeof sub; readonly value: Operands } & _common;
		export function Sub(value: Operands): Sub {
			return new VariantImpl(sub, value) as Sub;
		}

		export const mul = 'mul' as const;
		export type Mul = { readonly tag: typeof mul; readonly value: Operands } & _common;
		export function Mul(value: Operands): Mul {
			return new VariantImpl(mul, value) as Mul;
		}

		export const div = 'div' as const;
		export type Div = { readonly tag: typeof div; readonly value: Operands } & _common;
		export function Div(value: Operands): Div {
			return new VariantImpl(div, value) as Div;
		}

		export type _tt = typeof add | typeof sub | typeof mul | typeof div;
		export type _vt = Operands | Operands | Operands | Operands;
		type _common = Omit<VariantImpl, 'tag' | 'value'>;
		export function _ctor(t: _tt, v: _vt): Operation {
			return new VariantImpl(t, v) as Operation;
		}
		class VariantImpl {
			private readonly _tag: _tt;
			private readonly _value: _vt;
			constructor(t: _tt, value: _vt) {
				this._tag = t;
				this._value = value;
			}
			get tag(): _tt {
				return this._tag;
			}
			get value(): _vt {
				return this._value;
			}
			isAdd(): this is Add {
				return this._tag === Operation.add;
			}
			isSub(): this is Sub {
				return this._tag === Operation.sub;
			}
			isMul(): this is Mul {
				return this._tag === Operation.mul;
			}
			isDiv(): this is Div {
				return this._tag === Operation.div;
			}
		}
	}
	export type Operation = Operation.Add | Operation.Sub | Operation.Mul | Operation.Div;
}
export type Types = {
};

export namespace ReverseNotation {
	export enum Operation {
		add = 'add',
		sub = 'sub',
		mul = 'mul',
		div = 'div'
	}

	export namespace Engine {
		export interface Interface extends $wcm.Resource {
			pushOperand(operand: u32): void;

			pushOperation(operation: Operation): void;

			execute(): u32;
		}
		export type Statics = {
			$new?(): Interface;
		};
		export type Class = Statics & {
			new(): Interface;
		};
	}
	export type Engine = Engine.Interface;
}
export type ReverseNotation = {
	Engine: ReverseNotation.Engine.Class;
};
export namespace calculator {
	export type Operation = Types.Operation;
	export type Imports = {
		log: (msg: string) => void;
	};
	export type Exports = {
		calc: (o: Operation) => u32;
		reverseNotation: ReverseNotation;
	};
}

export namespace Types.$ {
	export const Operands = new $wcm.RecordType<Types.Operands>([
		['left', $wcm.u32],
		['right', $wcm.u32],
	]);
	export const Operation = new $wcm.VariantType<Types.Operation, Types.Operation._tt, Types.Operation._vt>([['add', Operands], ['sub', Operands], ['mul', Operands], ['div', Operands]], Types.Operation._ctor);
}
export namespace Types._ {
	export const id = 'vscode:example/types' as const;
	export const witName = 'types' as const;
	export const types: Map<string, $wcm.GenericComponentModelType> = new Map<string, $wcm.GenericComponentModelType>([
		['Operands', $.Operands],
		['Operation', $.Operation]
	]);
	export type WasmInterface = {
	};
}

export namespace ReverseNotation.$ {
	export const Operation = new $wcm.EnumType<ReverseNotation.Operation>(['add', 'sub', 'mul', 'div']);
	export const Engine = new $wcm.ResourceType<ReverseNotation.Engine>('engine', 'vscode:example/reverse-notation/engine');
	export const Engine_Handle = new $wcm.ResourceHandleType('engine');
	Engine.addDestructor('$drop', new $wcm.DestructorType('[resource-drop]engine', [['inst', Engine]]));
	Engine.addConstructor('constructor', new $wcm.ConstructorType<ReverseNotation.Engine.Class['constructor']>('[constructor]engine', [], new $wcm.OwnType(Engine_Handle)));
	Engine.addMethod('pushOperand', new $wcm.MethodType<ReverseNotation.Engine.Interface['pushOperand']>('[method]engine.push-operand', [
		['operand', $wcm.u32],
	], undefined));
	Engine.addMethod('pushOperation', new $wcm.MethodType<ReverseNotation.Engine.Interface['pushOperation']>('[method]engine.push-operation', [
		['operation', Operation],
	], undefined));
	Engine.addMethod('execute', new $wcm.MethodType<ReverseNotation.Engine.Interface['execute']>('[method]engine.execute', [], $wcm.u32));
}
export namespace ReverseNotation._ {
	export const id = 'vscode:example/reverse-notation' as const;
	export const witName = 'reverse-notation' as const;
	export namespace Engine {
		export type WasmInterface = {
			'[constructor]engine': () => i32;
			'[method]engine.push-operand': (self: i32, operand: i32) => void;
			'[method]engine.push-operation': (self: i32, operation_Operation: i32) => void;
			'[method]engine.execute': (self: i32) => i32;
		};
		export namespace imports {
			export type WasmInterface = Engine.WasmInterface & { '[resource-drop]engine': (self: i32) => void };
		}
		export namespace exports {
			export type WasmInterface = Engine.WasmInterface & { '[dtor]engine': (self: i32) => void };
		}
	}
	export const types: Map<string, $wcm.GenericComponentModelType> = new Map<string, $wcm.GenericComponentModelType>([
		['Operation', $.Operation],
		['Engine', $.Engine]
	]);
	export const resources: Map<string, $wcm.ResourceType> = new Map<string, $wcm.ResourceType>([
		['Engine', $.Engine]
	]);
	export type WasmInterface = {
	};
	export namespace imports {
		export type WasmInterface = _.WasmInterface & Engine.imports.WasmInterface;
	}
	export namespace exports {
		export type WasmInterface = _.WasmInterface & Engine.exports.WasmInterface;
		export namespace imports {
			export type WasmInterface = {
				'[resource-new]engine': (rep: i32) => i32;
				'[resource-rep]engine': (handle: i32) => i32;
				'[resource-drop]engine': (handle: i32) => void;
			};
		}
	}
}
export namespace calculator.$ {
	export const Operation = Types.$.Operation;
	export namespace imports {
		export const log = new $wcm.FunctionType<calculator.Imports['log']>('log',[
			['msg', $wcm.wstring],
		], undefined);
	}
	export namespace exports {
		export const calc = new $wcm.FunctionType<calculator.Exports['calc']>('calc',[
			['o', Operation],
		], $wcm.u32);
	}
}
export namespace calculator._ {
	export const id = 'vscode:example/calculator' as const;
	export const witName = 'calculator' as const;
	export type $Root = {
		'log': (msg_ptr: i32, msg_len: i32) => void;
	};
	export namespace imports {
		export const functions: Map<string, $wcm.FunctionType> = new Map([
			['log', $.imports.log]
		]);
		export const interfaces: Map<string, $wcm.InterfaceType> = new Map<string, $wcm.InterfaceType>([
			['Types', Types._]
		]);
		export function create(service: calculator.Imports, context: $wcm.WasmContext): Imports {
			return $wcm.$imports.create<Imports>(_, service, context);
		}
		export function loop(service: calculator.Imports, context: $wcm.WasmContext): calculator.Imports {
			return $wcm.$imports.loop(_, service, context);
		}
	}
	export type Imports = {
		'$root': $Root;
		'[export]vscode:example/reverse-notation': ReverseNotation._.exports.imports.WasmInterface;
	};
	export namespace exports {
		export const functions: Map<string, $wcm.FunctionType> = new Map([
			['calc', $.exports.calc]
		]);
		export const interfaces: Map<string, $wcm.InterfaceType> = new Map<string, $wcm.InterfaceType>([
			['ReverseNotation', ReverseNotation._]
		]);
		export function bind(exports: Exports, context: $wcm.WasmContext): calculator.Exports {
			return $wcm.$exports.bind<calculator.Exports>(_, exports, context);
		}
	}
	export type Exports = {
		'calc': (o_Operation_case: i32, o_Operation_0: i32, o_Operation_1: i32) => i32;
		'vscode:example/reverse-notation#[constructor]engine': () => i32;
		'vscode:example/reverse-notation#[method]engine.push-operand': (self: i32, operand: i32) => void;
		'vscode:example/reverse-notation#[method]engine.push-operation': (self: i32, operation_Operation: i32) => void;
		'vscode:example/reverse-notation#[method]engine.execute': (self: i32) => i32;
	};
	export function bind(service: calculator.Imports, code: $wcm.Code, context?: $wcm.ComponentModelContext): Promise<calculator.Exports>;
	export function bind(service: $wcm.$imports.Promisify<calculator.Imports>, code: $wcm.Code, port: $wcm.RAL.ConnectionPort, context?: $wcm.ComponentModelContext): Promise<$wcm.$exports.Promisify<calculator.Exports>>;
	export function bind(service: calculator.Imports | $wcm.$imports.Promisify<calculator.Imports>, code: $wcm.Code, portOrContext?: $wcm.RAL.ConnectionPort | $wcm.ComponentModelContext, context?: $wcm.ComponentModelContext | undefined): Promise<calculator.Exports> | Promise<$wcm.$exports.Promisify<calculator.Exports>> {
		return $wcm.$main.bind(_, service, code, portOrContext, context);
	}
}