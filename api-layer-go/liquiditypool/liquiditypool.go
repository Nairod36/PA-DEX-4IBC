// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package liquiditypool

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// LiquidityPoolABI is the input ABI used to generate the binding from.
const LiquidityPoolABI = `[{"type":"constructor","inputs":[{"name":"_tokenA","type":"address","internalType":"address"},{"name":"_tokenB","type":"address","internalType":"address"},{"name":"_starDexToken","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"addLiquidity","inputs":[{"name":"_tokenA","type":"address","internalType":"address"},{"name":"_tokenB","type":"address","internalType":"address"},{"name":"_amountA","type":"uint256","internalType":"uint256"},{"name":"_amountB","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getAmounts","inputs":[{"name":"_amountIn","type":"uint256","internalType":"uint256"},{"name":"_liquidityIn","type":"uint256","internalType":"uint256"},{"name":"_liquidityOut","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"amountInWithFee","type":"uint256","internalType":"uint256"},{"name":"amountOut","type":"uint256","internalType":"uint256"}],"stateMutability":"pure"},{"type":"function","name":"liquidityA","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"liquidityB","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"removeLiquidity","inputs":[{"name":"_tokenA","type":"address","internalType":"address"},{"name":"_tokenB","type":"address","internalType":"address"},{"name":"_amountA","type":"uint256","internalType":"uint256"},{"name":"_amountB","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"reserveA","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"reserveB","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"starDexToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"swap","inputs":[{"name":"_tokenIn","type":"address","internalType":"address"},{"name":"_amountIn","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"tokenA","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"tokenB","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"userLiquidity","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"liquidityTokenA","type":"uint256","internalType":"uint256"},{"name":"liquidityTokenB","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"event","name":"LiquidityAdded","inputs":[{"name":"user","type":"address","indexed":true,"internalType":"address"},{"name":"tokenA","type":"address","indexed":false,"internalType":"address"},{"name":"tokenB","type":"address","indexed":false,"internalType":"address"},{"name":"amountA","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"amountB","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"LiquidityRemoved","inputs":[{"name":"user","type":"address","indexed":true,"internalType":"address"},{"name":"tokenA","type":"address","indexed":false,"internalType":"address"},{"name":"tokenB","type":"address","indexed":false,"internalType":"address"},{"name":"amountA","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"amountB","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]}]`

// LiquidityPoolBin is the compiled bytecode used for deploying new contracts.
const LiquidityPoolBin = `0x6080604052348015600f57600080fd5b50604051610fd6380380610fd6833981016040819052602c91608d565b6001600081905580546001600160a01b039485166001600160a01b03199182161790915560028054938516938216939093179092556007805491909316911617905560c9565b80516001600160a01b0381168114608857600080fd5b919050565b60008060006060848603121560a157600080fd5b60a8846072565b925060b4602085016072565b915060c0604085016072565b90509250925092565b610efe806100d86000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806379629b691161007157806379629b6914610159578063ba4c28c314610162578063ce81543714610189578063cf6c62ea1461019c578063d004f0f7146101af578063dc5fa6c5146101c257600080fd5b80630fc63d10146100b957806319e36f3b146100e957806324731cff146101005780633ee7f9d3146101095780635f64b55b1461011e578063780a110014610131575b600080fd5b6001546100cc906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100f260065481565b6040519081526020016100e0565b6100f260045481565b61011c610117366004610cb1565b6101cb565b005b6002546100cc906001600160a01b031681565b61014461013f366004610cf3565b610407565b604080519283526020830191909152016100e0565b6100f260035481565b610144610170366004610d1f565b6008602052600090815260409020805460019091015482565b6007546100cc906001600160a01b031681565b61011c6101aa366004610cb1565b61050e565b61011c6101bd366004610d41565b610852565b6100f260055481565b6101d3610c6b565b336000908152600860205260409020805483118015906101f7575081816001015410155b61021c5760405162461bcd60e51b815260040161021390610d6b565b60405180910390fd5b826003600082825461022e9190610daf565b9250508190555081600460008282546102479190610daf565b9091555050805483908290600090610260908490610daf565b925050819055508181600101600082825461027b9190610daf565b909155505060015460405163a9059cbb60e01b8152336004820152602481018590526001600160a01b039091169063a9059cbb906044016020604051808303816000875af11580156102d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102f59190610dc8565b6103115760405162461bcd60e51b815260040161021390610dea565b60025460405163a9059cbb60e01b8152336004820152602481018490526001600160a01b039091169063a9059cbb906044016020604051808303816000875af1158015610362573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103869190610dc8565b6103a25760405162461bcd60e51b815260040161021390610e21565b604080516001600160a01b038781168252861660208201529081018490526060810183905233907fd0aab0ed3b13a2551c0f217aa790c138f132954984c5d047ae27188f7205de119060800160405180910390a2506104016001600055565b50505050565b600080600085116104515760405162461bcd60e51b8152602060048201526014602482015273125b9d985b1a59081a5b9c1d5d08185b5bdd5b9d60621b6044820152606401610213565b6000841180156104615750600083115b6104a65760405162461bcd60e51b8152602060048201526016602482015275496e73756666696369656e74206c697175696469747960501b6044820152606401610213565b6104b2856103ca610e58565b915060006104c08486610e58565b6104cc906103e8610e58565b90506000836104dd876103e8610e58565b6104e79190610e6f565b905060006104f58284610e82565b90506105018187610daf565b9350505050935093915050565b610516610c6b565b6000821180156105265750600081115b61057c5760405162461bcd60e51b815260206004820152602160248201527f416d6f756e7473206d7573742062652067726561746572207468616e207a65726044820152606f60f81b6064820152608401610213565b6001546040516323b872dd60e01b81526001600160a01b03909116906323b872dd906105b090339030908790600401610ea4565b6020604051808303816000875af11580156105cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f39190610dc8565b61060f5760405162461bcd60e51b815260040161021390610dea565b6002546040516323b872dd60e01b81526001600160a01b03909116906323b872dd9061064390339030908690600401610ea4565b6020604051808303816000875af1158015610662573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106869190610dc8565b6106a25760405162461bcd60e51b815260040161021390610e21565b6007546001600160a01b031663a9059cbb336106be8486610e6f565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af1158015610709573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072d9190610dc8565b6107795760405162461bcd60e51b815260206004820181905260248201527f5472616e73666572206f66205374617244657820546f6b656e206661696c65646044820152606401610213565b816003600082825461078b9190610e6f565b9250508190555080600460008282546107a49190610e6f565b909155505033600090815260086020526040812080548492906107c8908490610e6f565b909155505033600090815260086020526040812060010180548392906107ef908490610e6f565b9091555050604080516001600160a01b038087168252851660208201529081018390526060810182905233907fb5bf3f2c68363aa6e695c29010485bcfecb5439239c6b1306fdec5b26cb7c62e9060800160405180910390a26104016001600055565b61085a610c6b565b6001546001600160a01b038381169116148061088357506002546001600160a01b038381169116145b6108cf5760405162461bcd60e51b815260206004820152601760248201527f546f6b656e206e6f7420666f756e6420696e20706169720000000000000000006044820152606401610213565b6001546001600160a01b0390811690831603610a985780600354116109065760405162461bcd60e51b815260040161021390610d6b565b6001546040516323b872dd60e01b81526001600160a01b03909116906323b872dd9061093a90339030908690600401610ea4565b6020604051808303816000875af1158015610959573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061097d9190610dc8565b6109995760405162461bcd60e51b815260040161021390610dea565b6000806109ab83600354600454610407565b9150915081600360008282546109c19190610e6f565b909155506109d190508284610daf565b600560008282546109e29190610e6f565b9250508190555080600460008282546109fb9190610daf565b909155505060025460405163a9059cbb60e01b8152336004820152602481018390526001600160a01b039091169063a9059cbb906044016020604051808303816000875af1158015610a51573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a759190610dc8565b610a915760405162461bcd60e51b815260040161021390610dea565b5050610c5d565b6002546001600160a01b0390811690831603610c5d578060045411610acf5760405162461bcd60e51b815260040161021390610d6b565b6002546040516323b872dd60e01b81526001600160a01b03909116906323b872dd90610b0390339030908690600401610ea4565b6020604051808303816000875af1158015610b22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b469190610dc8565b610b625760405162461bcd60e51b815260040161021390610e21565b600080610b7483600454600354610407565b915091508160046000828254610b8a9190610e6f565b90915550610b9a90508284610daf565b60066000828254610bab9190610e6f565b925050819055508060036000828254610bc49190610daf565b909155505060015460405163a9059cbb60e01b8152336004820152602481018390526001600160a01b039091169063a9059cbb906044016020604051808303816000875af1158015610c1a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3e9190610dc8565b610c5a5760405162461bcd60e51b815260040161021390610e21565b50505b610c676001600055565b5050565b600260005403610c8e57604051633ee5aeb560e01b815260040160405180910390fd5b6002600055565b80356001600160a01b0381168114610cac57600080fd5b919050565b60008060008060808587031215610cc757600080fd5b610cd085610c95565b9350610cde60208601610c95565b93969395505050506040820135916060013590565b600080600060608486031215610d0857600080fd5b505081359360208301359350604090920135919050565b600060208284031215610d3157600080fd5b610d3a82610c95565b9392505050565b60008060408385031215610d5457600080fd5b610d5d83610c95565b946020939093013593505050565b6020808252601490820152734e6f7420656e6f756768206c697175696469747960601b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b81810381811115610dc257610dc2610d99565b92915050565b600060208284031215610dda57600080fd5b81518015158114610d3a57600080fd5b6020808252601a908201527f5472616e73666572206f6620746f6b656e2041206661696c6564000000000000604082015260600190565b6020808252601a908201527f5472616e73666572206f6620746f6b656e2042206661696c6564000000000000604082015260600190565b8082028115828204841417610dc257610dc2610d99565b80820180821115610dc257610dc2610d99565b600082610e9f57634e487b7160e01b600052601260045260246000fd5b500490565b6001600160a01b03938416815291909216602082015260408101919091526060019056fea2646970667358221220c0089941624bde5f23969f02b998a0e441b784373c110d2fab9bb6bef5fbcd2b64736f6c63430008190033`

// DeployLiquidityPool deploys a new Ethereum contract, binding an instance of LiquidityPool to it.
func DeployLiquidityPool(auth *bind.TransactOpts, backend bind.ContractBackend, _tokenA common.Address, _tokenB common.Address, _starDexToken common.Address) (common.Address, *types.Transaction, *LiquidityPool, error) {
	parsed, err := abi.JSON(strings.NewReader(LiquidityPoolABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(LiquidityPoolBin), backend, _tokenA, _tokenB, _starDexToken)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &LiquidityPool{LiquidityPoolCaller: LiquidityPoolCaller{contract: contract}, LiquidityPoolTransactor: LiquidityPoolTransactor{contract: contract}, LiquidityPoolFilterer: LiquidityPoolFilterer{contract: contract}}, nil
}

// LiquidityPool is an auto generated Go binding around an Ethereum contract.
type LiquidityPool struct {
	LiquidityPoolCaller     // Read-only binding to the contract
	LiquidityPoolTransactor // Write-only binding to the contract
	LiquidityPoolFilterer   // Log filterer for contract events
}

// LiquidityPoolCaller is an auto generated read-only Go binding around an Ethereum contract.
type LiquidityPoolCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LiquidityPoolTransactor is an auto generated write-only Go binding around an Ethereum contract.
type LiquidityPoolTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LiquidityPoolFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type LiquidityPoolFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// NewLiquidityPool creates a new instance of LiquidityPool, bound to a specific deployed contract.
func NewLiquidityPool(address common.Address, backend bind.ContractBackend) (*LiquidityPool, error) {
	contract, err := bindLiquidityPool(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &LiquidityPool{LiquidityPoolCaller: LiquidityPoolCaller{contract: contract}, LiquidityPoolTransactor: LiquidityPoolTransactor{contract: contract}, LiquidityPoolFilterer: LiquidityPoolFilterer{contract: contract}}, nil
}

// bindLiquidityPool binds a generic wrapper to an already deployed contract.
func bindLiquidityPool(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(LiquidityPoolABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// AddLiquidity is a paid mutator transaction binding the contract method 0xcf6c62ea.
//
// Solidity: function addLiquidity(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB) returns()
func (_LiquidityPool *LiquidityPoolTransactor) AddLiquidity(opts *bind.TransactOpts, _tokenA common.Address, _tokenB common.Address, _amountA *big.Int, _amountB *big.Int) (*types.Transaction, error) {
	return _LiquidityPool.contract.Transact(opts, "addLiquidity", _tokenA, _tokenB, _amountA, _amountB)
}

// RemoveLiquidity is a paid mutator transaction binding the contract method 0x3ee7f9d3.
//
// Solidity: function removeLiquidity(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB) returns()
func (_LiquidityPool *LiquidityPoolTransactor) RemoveLiquidity(opts *bind.TransactOpts, _tokenA common.Address, _tokenB common.Address, _amountA *big.Int, _amountB *big.Int) (*types.Transaction, error) {
	return _LiquidityPool.contract.Transact(opts, "removeLiquidity", _tokenA, _tokenB, _amountA, _amountB)
}

// Swap is a paid mutator transaction binding the contract method 0xd004f0f7.
//
// Solidity: function swap(address _tokenIn, uint256 _amountIn) returns()
func (_LiquidityPool *LiquidityPoolTransactor) Swap(opts *bind.TransactOpts, _tokenIn common.Address, _amountIn *big.Int) (*types.Transaction, error) {
	return _LiquidityPool.contract.Transact(opts, "swap", _tokenIn, _amountIn)
}

// GetAmounts is a free data retrieval call binding the contract method 0x780a1100.
//
// Solidity: function getAmounts(uint256 _amountIn, uint256 _liquidityIn, uint256 _liquidityOut) pure returns(uint256 amountInWithFee, uint256 amountOut)
func (_LiquidityPool *LiquidityPoolCaller) GetAmounts(opts *bind.CallOpts, _amountIn *big.Int, _liquidityIn *big.Int, _liquidityOut *big.Int) (struct {
	AmountInWithFee *big.Int
	AmountOut       *big.Int
}, error) {
	var out []interface{}
	err := _LiquidityPool.contract.Call(opts, &out, "getAmounts", _amountIn, _liquidityIn, _liquidityOut)
	if err != nil {
		return struct {
			AmountInWithFee *big.Int
			AmountOut       *big.Int
		}{}, err
	}
	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)
	out1 := *abi.ConvertType(out[1], new(*big.Int)).(**big.Int)
	return struct {
		AmountInWithFee *big.Int
		AmountOut       *big.Int
	}{
		AmountInWithFee: out0,
		AmountOut:       out1,
	}, err
}

// LiquidityA is a free data retrieval call binding the contract method 0x79629b69.
//
// Solidity: function liquidityA() view returns(uint256)
func (_LiquidityPool *LiquidityPoolCaller) LiquidityA(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LiquidityPool.contract.Call(opts, &out, "liquidityA")
	if err != nil {
		return nil, err
	}
	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)
	return out0, err
}

// LiquidityB is a free data retrieval call binding the contract method 0x24731cff.
//
// Solidity: function liquidityB() view returns(uint256)
func (_LiquidityPool *LiquidityPoolCaller) LiquidityB(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LiquidityPool.contract.Call(opts, &out, "liquidityB")
	if err != nil {
		return nil, err
	}
	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)
	return out0, err
}

// ReserveA is a free data retrieval call binding the contract method 0xdc5fa6c5.
//
// Solidity: function reserveA() view returns(uint256)
func (_LiquidityPool *LiquidityPoolCaller) ReserveA(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LiquidityPool.contract.Call(opts, &out, "reserveA")
	if err != nil {
		return nil, err
	}
	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)
	return out0, err
}

// ReserveB is a free data retrieval call binding the contract method 0x19e36f3b.
//
// Solidity: function reserveB() view returns(uint256)
func (_LiquidityPool *LiquidityPoolCaller) ReserveB(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LiquidityPool.contract.Call(opts, &out, "reserveB")
	if err != nil {
		return nil, err
	}
	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)
	return out0, err
}

// StarDexToken is a free data retrieval call binding the contract method 0xce815437.
//
// Solidity: function starDexToken() view returns(address)
func (_LiquidityPool *LiquidityPoolCaller) StarDexToken(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _LiquidityPool.contract.Call(opts, &out, "starDexToken")
	if err != nil {
		return common.Address{}, err
	}
	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	return out0, err
}

// TokenA is a free data retrieval call binding the contract method 0x0fc63d10.
//
// Solidity: function tokenA() view returns(address)
func (_LiquidityPool *LiquidityPoolCaller) TokenA(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _LiquidityPool.contract.Call(opts, &out, "tokenA")
	if err != nil {
		return common.Address{}, err
	}
	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	return out0, err
}

// TokenB is a free data retrieval call binding the contract method 0x5f64b55b.
//
// Solidity: function tokenB() view returns(address)
func (_LiquidityPool *LiquidityPoolCaller) TokenB(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _LiquidityPool.contract.Call(opts, &out, "tokenB")
	if err != nil {
		return common.Address{}, err
	}
	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	return out0, err
}

// UserLiquidity is a free data retrieval call binding the contract method 0xba4c28c3.
//
// Solidity: function userLiquidity(address ) view returns(uint256 liquidityTokenA, uint256 liquidityTokenB)
func (_LiquidityPool *LiquidityPoolCaller) UserLiquidity(opts *bind.CallOpts, arg0 common.Address) (struct {
	LiquidityTokenA *big.Int
	LiquidityTokenB *big.Int
}, error) {
	var out []interface{}
	err := _LiquidityPool.contract.Call(opts, &out, "userLiquidity", arg0)
	if err != nil {
		return struct {
			LiquidityTokenA *big.Int
			LiquidityTokenB *big.Int
		}{}, err
	}
	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)
	out1 := *abi.ConvertType(out[1], new(*big.Int)).(**big.Int)
	return struct {
		LiquidityTokenA *big.Int
		LiquidityTokenB *big.Int
	}{
		LiquidityTokenA: out0,
		LiquidityTokenB: out1,
	}, err
}

// FilterLiquidityAdded is a free log retrieval operation binding the contract event 0xd70e650b1fc5b74960ecfa210ff69de9f5088a46996de93c6b3505ed58a98196.
//
// Solidity: event LiquidityAdded(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB)
func (_LiquidityPool *LiquidityPoolFilterer) FilterLiquidityAdded(opts *bind.FilterOpts, user []common.Address) (*LiquidityPoolLiquidityAddedIterator, error) {

	var userRule []interface{}
	for _, userItem := range user {
		userRule = append(userRule, userItem)
	}

	logs, sub, err := _LiquidityPool.contract.FilterLogs(opts, "LiquidityAdded", userRule)
	if err != nil {
		return nil, err
	}
	return &LiquidityPoolLiquidityAddedIterator{contract: _LiquidityPool.contract, event: "LiquidityAdded", logs: logs, sub: sub}, nil
}

// WatchLiquidityAdded is a free log subscription operation binding the contract event 0xd70e650b1fc5b74960ecfa210ff69de9f5088a46996de93c6b3505ed58a98196.
//
// Solidity: event LiquidityAdded(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB)
func (_LiquidityPool *LiquidityPoolFilterer) WatchLiquidityAdded(opts *bind.WatchOpts, sink chan<- *LiquidityPoolLiquidityAdded, user []common.Address) (event.Subscription, error) {

	var userRule []interface{}
	for _, userItem := range user {
		userRule = append(userRule, userItem)
	}

	logs, sub, err := _LiquidityPool.contract.WatchLogs(opts, "LiquidityAdded", userRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				event := new(LiquidityPoolLiquidityAdded)
				if err := _LiquidityPool.contract.UnpackLog(event, "LiquidityAdded", log); err != nil {
					return err
				}
				select {
				case sink <- event:
				case err := <-quit:
					return err
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseLiquidityAdded is a log parse operation binding the contract event 0xd70e650b1fc5b74960ecfa210ff69de9f5088a46996de93c6b3505ed58a98196.
//
// Solidity: event LiquidityAdded(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB)
func (_LiquidityPool *LiquidityPoolFilterer) ParseLiquidityAdded(log types.Log) (*LiquidityPoolLiquidityAdded, error) {
	event := new(LiquidityPoolLiquidityAdded)
	if err := _LiquidityPool.contract.UnpackLog(event, "LiquidityAdded", log); err != nil {
		return nil, err
	}
	return event, nil
}

// FilterLiquidityRemoved is a free log retrieval operation binding the contract event 0xc029fcfc4e6b0d46fdd4d4807c11fd62bafae80896fd227d3608ad87d0f0075a.
//
// Solidity: event LiquidityRemoved(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB)
func (_LiquidityPool *LiquidityPoolFilterer) FilterLiquidityRemoved(opts *bind.FilterOpts, user []common.Address) (*LiquidityPoolLiquidityRemovedIterator, error) {

	var userRule []interface{}
	for _, userItem := range user {
		userRule = append(userRule, userItem)
	}

	logs, sub, err := _LiquidityPool.contract.FilterLogs(opts, "LiquidityRemoved", userRule)
	if err != nil {
		return nil, err
	}
	return &LiquidityPoolLiquidityRemovedIterator{contract: _LiquidityPool.contract, event: "LiquidityRemoved", logs: logs, sub: sub}, nil
}

// WatchLiquidityRemoved is a free log subscription operation binding the contract event 0xc029fcfc4e6b0d46fdd4d4807c11fd62bafae80896fd227d3608ad87d0f0075a.
//
// Solidity: event LiquidityRemoved(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB)
func (_LiquidityPool *LiquidityPoolFilterer) WatchLiquidityRemoved(opts *bind.WatchOpts, sink chan<- *LiquidityPoolLiquidityRemoved, user []common.Address) (event.Subscription, error) {

	var userRule []interface{}
	for _, userItem := range user {
		userRule = append(userRule, userItem)
	}

	logs, sub, err := _LiquidityPool.contract.WatchLogs(opts, "LiquidityRemoved", userRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				event := new(LiquidityPoolLiquidityRemoved)
				if err := _LiquidityPool.contract.UnpackLog(event, "LiquidityRemoved", log); err != nil {
					return err
				}
				select {
				case sink <- event:
				case err := <-quit:
					return err
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseLiquidityRemoved is a log parse operation binding the contract event 0xc029fcfc4e6b0d46fdd4d4807c11fd62bafae80896fd227d3608ad87d0f0075a.
//
// Solidity: event LiquidityRemoved(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB)
func (_LiquidityPool *LiquidityPoolFilterer) ParseLiquidityRemoved(log types.Log) (*LiquidityPoolLiquidityRemoved, error) {
	event := new(LiquidityPoolLiquidityRemoved)
	if err := _LiquidityPool.contract.UnpackLog(event, "LiquidityRemoved", log); err != nil {
		return nil, err
	}
	return event, nil
}

// LiquidityPoolLiquidityAddedIterator is returned from FilterLiquidityAdded and is used to iterate over the raw logs and unpacked data for LiquidityAdded events raised by the LiquidityPool contract.
type LiquidityPoolLiquidityAddedIterator struct {
	Event *LiquidityPoolLiquidityAdded // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to unpack event data for

	event string // Event name to use for unpacking log

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there are any more events found.
func (it *LiquidityPoolLiquidityAddedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver the last batch of logs
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LiquidityPoolLiquidityAdded)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			return true
		default:
			return false
		}
	}
	// Wait for the next log on the subscription
	select {
	case log := <-it.logs:
		it.Event = new(LiquidityPoolLiquidityAdded)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		return true
	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LiquidityPoolLiquidityAddedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying resources.
func (it *LiquidityPoolLiquidityAddedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LiquidityPoolLiquidityAdded represents a LiquidityAdded event raised by the LiquidityPool contract.
type LiquidityPoolLiquidityAdded struct {
	User    common.Address
	TokenA  common.Address
	TokenB  common.Address
	AmountA *big.Int
	AmountB *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// LiquidityPoolLiquidityRemovedIterator is returned from FilterLiquidityRemoved and is used to iterate over the raw logs and unpacked data for LiquidityRemoved events raised by the LiquidityPool contract.
type LiquidityPoolLiquidityRemovedIterator struct {
	Event *LiquidityPoolLiquidityRemoved // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to unpack event data for

	event string // Event name to use for unpacking log

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there are any more events found.
func (it *LiquidityPoolLiquidityRemovedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver the last batch of logs
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LiquidityPoolLiquidityRemoved)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			return true
		default:
			return false
		}
	}
	// Wait for the next log on the subscription
	select {
	case log := <-it.logs:
		it.Event = new(LiquidityPoolLiquidityRemoved)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		return true
	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LiquidityPoolLiquidityRemovedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying resources.
func (it *LiquidityPoolLiquidityRemovedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LiquidityPoolLiquidityRemoved represents a LiquidityRemoved event raised by the LiquidityPool contract.
type LiquidityPoolLiquidityRemoved struct {
	User    common.Address
	TokenA  common.Address
	TokenB  common.Address
	AmountA *big.Int
	AmountB *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}
