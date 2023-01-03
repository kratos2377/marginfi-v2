export type Marginfi = {
  version: "0.1.0";
  name: "marginfi";
  docs: [
    "Marginfi v2 program entrypoint.",
    "",
    "Instructions:",
    "Admin instructions:",
    "- `initialize_marginfi_group` - Initializes a new marginfi group.",
    "- `configure_marginfi_group` - Configures a marginfi group.",
    "- `lending_pool_add_bank` - Adds a bank to a lending pool.",
    "- `lending_pool_configure_bank` - Configures a bank in a lending pool.",
    "",
    "User instructions:",
    "- `create_margin_account` - Creates a new margin account.",
    "- `lending_pool_deposit` - Deposits liquidity into a bank.",
    "- `lending_pool_withdraw` - Withdraws liquidity from a bank.",
    "- `liquidate` - Liquidates a margin account.",
    "",
    "Operational instructions:",
    "- `accrue_interest` - Accrues interest for a reserve."
  ];
  instructions: [
    {
      name: "initializeMarginfiGroup";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "configureMarginfiGroup";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "config";
          type: {
            defined: "GroupConfig";
          };
        }
      ];
    },
    {
      name: "lendingPoolAddBank";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "assetMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "liquidityVaultAuthority";
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "liquidity_vault_auth";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "Mint";
                path: "asset_mint";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "liquidityVault";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "liquidity_vault";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "Mint";
                path: "asset_mint";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "insuranceVaultAuthority";
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "insurance_vault_auth";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "Mint";
                path: "asset_mint";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "insuranceVault";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "insurance_vault";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "Mint";
                path: "asset_mint";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "feeVaultAuthority";
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "fee_vault_auth";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "Mint";
                path: "asset_mint";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "feeVault";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "fee_vault";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "Mint";
                path: "asset_mint";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "pythOracle";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "bankIndex";
          type: "u16";
        },
        {
          name: "bankConfig";
          type: {
            defined: "BankConfig";
          };
        }
      ];
    },
    {
      name: "lendingPoolConfigureBank";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        },
        {
          name: "pythOracle";
          isMut: false;
          isSigner: false;
          docs: [
            "Set only if pyth oracle is being changed otherwise can be a random account."
          ];
        }
      ];
      args: [
        {
          name: "bankIndex";
          type: "u16";
        },
        {
          name: "bankConfigOpt";
          type: {
            defined: "BankConfigOpt";
          };
        }
      ];
    },
    {
      name: "initializeMarginfiAccount";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: false;
          isSigner: false;
        },
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "bankDeposit";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "assetMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "signerTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankLiquidityVault";
          isMut: true;
          isSigner: false;
          docs: ["TODO: Store bump on-chain"];
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "liquidity_vault";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "Mint";
                path: "asset_mint";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "bankWithdraw";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "assetMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "destinationTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankLiquidityVaultAuthority";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "liquidity_vault_auth";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "Mint";
                path: "asset_mint";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "bankLiquidityVault";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "liquidity_vault";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "Mint";
                path: "asset_mint";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "liquidate";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "liquidatorMarginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "liquidateeMarginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankLiquidityVaultAuthority";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "liquidity_vault_auth";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "bankLiquidityVault";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "liquidity_vault";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "bankInsuranceVault";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "insurance_vault";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "assetBankIndex";
          type: "u16";
        },
        {
          name: "assetAmount";
          type: "u64";
        },
        {
          name: "liabBankIndex";
          type: "u16";
        }
      ];
    },
    {
      name: "bankAccrueInterest";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "liquidityVaultAuthority";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "liquidity_vault_auth";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "liquidityVault";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "liquidity_vault";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "insuranceVault";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "insurance_vault";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "feeVault";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "fee_vault";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "marginfi_group";
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "bankIndex";
          type: "u16";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "marginfiAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "publicKey";
          },
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "lendingAccount";
            type: {
              defined: "LendingAccount";
            };
          }
        ];
      };
    },
    {
      name: "marginfiGroup";
      type: {
        kind: "struct";
        fields: [
          {
            name: "lendingPool";
            type: {
              defined: "LendingPool";
            };
          },
          {
            name: "admin";
            type: "publicKey";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "LendingAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "balances";
            type: {
              array: [
                {
                  option: {
                    defined: "Balance";
                  };
                },
                16
              ];
            };
          }
        ];
      };
    },
    {
      name: "Balance";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bankIndex";
            type: "u8";
          },
          {
            name: "depositShares";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "liabilityShares";
            type: {
              defined: "WrappedI80F48";
            };
          }
        ];
      };
    },
    {
      name: "GroupConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: {
              option: "publicKey";
            };
          }
        ];
      };
    },
    {
      name: "LendingPool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "banks";
            type: {
              array: [
                {
                  option: {
                    defined: "Bank";
                  };
                },
                128
              ];
            };
          }
        ];
      };
    },
    {
      name: "InterestRateConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "optimalUtilizationRate";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "plateauInterestRate";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "maxInterestRate";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "insuranceFeeFixedApr";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "insuranceIrFee";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "protocolFixedFeeApr";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "protocolIrFee";
            type: {
              defined: "WrappedI80F48";
            };
          }
        ];
      };
    },
    {
      name: "Bank";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mintPk";
            type: "publicKey";
          },
          {
            name: "depositShareValue";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "liabilityShareValue";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "liquidityVault";
            type: "publicKey";
          },
          {
            name: "insuranceVault";
            type: "publicKey";
          },
          {
            name: "feeVault";
            type: "publicKey";
          },
          {
            name: "config";
            type: {
              defined: "BankConfig";
            };
          },
          {
            name: "totalBorrowShares";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "totalDepositShares";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "lastUpdate";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "BankConfig";
      docs: [
        "TODO: Convert weights to (u64, u64) to avoid precision loss (maybe?)"
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "depositWeightInit";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "depositWeightMaint";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "liabilityWeightInit";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "liabilityWeightMaint";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "maxCapacity";
            type: "u64";
          },
          {
            name: "pythOracle";
            type: "publicKey";
          },
          {
            name: "interestRateConfig";
            type: {
              defined: "InterestRateConfig";
            };
          }
        ];
      };
    },
    {
      name: "WrappedI80F48";
      type: {
        kind: "struct";
        fields: [
          {
            name: "value";
            type: "i128";
          }
        ];
      };
    },
    {
      name: "BankConfigOpt";
      type: {
        kind: "struct";
        fields: [
          {
            name: "depositWeightInit";
            type: {
              option: {
                defined: "WrappedI80F48";
              };
            };
          },
          {
            name: "depositWeightMaint";
            type: {
              option: {
                defined: "WrappedI80F48";
              };
            };
          },
          {
            name: "liabilityWeightInit";
            type: {
              option: {
                defined: "WrappedI80F48";
              };
            };
          },
          {
            name: "liabilityWeightMaint";
            type: {
              option: {
                defined: "WrappedI80F48";
              };
            };
          },
          {
            name: "maxCapacity";
            type: {
              option: "u64";
            };
          },
          {
            name: "pythOracle";
            type: {
              option: "publicKey";
            };
          }
        ];
      };
    },
    {
      name: "WeightType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Initial";
          },
          {
            name: "Maintenance";
          }
        ];
      };
    },
    {
      name: "RiskRequirementType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Initial";
          },
          {
            name: "Maintenance";
          }
        ];
      };
    },
    {
      name: "BankVaultType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Liquidity";
          },
          {
            name: "Insurance";
          },
          {
            name: "Fee";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "MathError";
      msg: "Math error";
    },
    {
      code: 6001;
      name: "BankNotFound";
      msg: "Invalid bank index";
    },
    {
      code: 6002;
      name: "LendingAccountBalanceNotFound";
      msg: "Lending account balance not found";
    },
    {
      code: 6003;
      name: "BankDepositCapacityExceeded";
      msg: "Bank deposit capacity exceeded";
    },
    {
      code: 6004;
      name: "InvalidTransfer";
      msg: "Invalid transfer";
    },
    {
      code: 6005;
      name: "InvalidPythAccount";
      msg: "Invalid Pyth account";
    },
    {
      code: 6006;
      name: "MissingPythAccount";
      msg: "Missing Pyth account";
    },
    {
      code: 6007;
      name: "BadAccountHealth";
      msg: "Bad account health";
    },
    {
      code: 6008;
      name: "LendingAccountBalanceSlotsFull";
      msg: "Lending account balance slots are full";
    },
    {
      code: 6009;
      name: "BankAlreadyExists";
      msg: "Bank already exists";
    },
    {
      code: 6010;
      name: "BorrowingNotAllowed";
      msg: "Borrowing not allowed";
    },
    {
      code: 6011;
      name: "AccountIllegalPostLiquidationState";
      msg: "Illegal post liquidation state, account is either not unhealthy or liquidation was too big";
    }
  ];
};

export const IDL: Marginfi = {
  version: "0.1.0",
  name: "marginfi",
  docs: [
    "Marginfi v2 program entrypoint.",
    "",
    "Instructions:",
    "Admin instructions:",
    "- `initialize_marginfi_group` - Initializes a new marginfi group.",
    "- `configure_marginfi_group` - Configures a marginfi group.",
    "- `lending_pool_add_bank` - Adds a bank to a lending pool.",
    "- `lending_pool_configure_bank` - Configures a bank in a lending pool.",
    "",
    "User instructions:",
    "- `create_margin_account` - Creates a new margin account.",
    "- `lending_pool_deposit` - Deposits liquidity into a bank.",
    "- `lending_pool_withdraw` - Withdraws liquidity from a bank.",
    "- `liquidate` - Liquidates a margin account.",
    "",
    "Operational instructions:",
    "- `accrue_interest` - Accrues interest for a reserve.",
  ],
  instructions: [
    {
      name: "initializeMarginfiGroup",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "configureMarginfiGroup",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "config",
          type: {
            defined: "GroupConfig",
          },
        },
      ],
    },
    {
      name: "lendingPoolAddBank",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "assetMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "liquidityVaultAuthority",
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "liquidity_vault_auth",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "asset_mint",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "liquidityVault",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "liquidity_vault",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "asset_mint",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "insuranceVaultAuthority",
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "insurance_vault_auth",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "asset_mint",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "insuranceVault",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "insurance_vault",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "asset_mint",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "feeVaultAuthority",
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "fee_vault_auth",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "asset_mint",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "feeVault",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "fee_vault",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "asset_mint",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "pythOracle",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "bankIndex",
          type: "u16",
        },
        {
          name: "bankConfig",
          type: {
            defined: "BankConfig",
          },
        },
      ],
    },
    {
      name: "lendingPoolConfigureBank",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
        {
          name: "pythOracle",
          isMut: false,
          isSigner: false,
          docs: [
            "Set only if pyth oracle is being changed otherwise can be a random account.",
          ],
        },
      ],
      args: [
        {
          name: "bankIndex",
          type: "u16",
        },
        {
          name: "bankConfigOpt",
          type: {
            defined: "BankConfigOpt",
          },
        },
      ],
    },
    {
      name: "initializeMarginfiAccount",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: false,
          isSigner: false,
        },
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "bankDeposit",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "assetMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankLiquidityVault",
          isMut: true,
          isSigner: false,
          docs: ["TODO: Store bump on-chain"],
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "liquidity_vault",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "asset_mint",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "bankWithdraw",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "assetMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "destinationTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankLiquidityVaultAuthority",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "liquidity_vault_auth",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "asset_mint",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "bankLiquidityVault",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "liquidity_vault",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "asset_mint",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "liquidate",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "liquidatorMarginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "liquidateeMarginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankLiquidityVaultAuthority",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "liquidity_vault_auth",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "bankLiquidityVault",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "liquidity_vault",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "bankInsuranceVault",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "insurance_vault",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "assetBankIndex",
          type: "u16",
        },
        {
          name: "assetAmount",
          type: "u64",
        },
        {
          name: "liabBankIndex",
          type: "u16",
        },
      ],
    },
    {
      name: "bankAccrueInterest",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "liquidityVaultAuthority",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "liquidity_vault_auth",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "liquidityVault",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "liquidity_vault",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "insuranceVault",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "insurance_vault",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "feeVault",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "fee_vault",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "marginfi_group",
              },
            ],
          },
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "bankIndex",
          type: "u16",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "marginfiAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "group",
            type: "publicKey",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "lendingAccount",
            type: {
              defined: "LendingAccount",
            },
          },
        ],
      },
    },
    {
      name: "marginfiGroup",
      type: {
        kind: "struct",
        fields: [
          {
            name: "lendingPool",
            type: {
              defined: "LendingPool",
            },
          },
          {
            name: "admin",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "LendingAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "balances",
            type: {
              array: [
                {
                  option: {
                    defined: "Balance",
                  },
                },
                16,
              ],
            },
          },
        ],
      },
    },
    {
      name: "Balance",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bankIndex",
            type: "u8",
          },
          {
            name: "depositShares",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "liabilityShares",
            type: {
              defined: "WrappedI80F48",
            },
          },
        ],
      },
    },
    {
      name: "GroupConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            type: {
              option: "publicKey",
            },
          },
        ],
      },
    },
    {
      name: "LendingPool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "banks",
            type: {
              array: [
                {
                  option: {
                    defined: "Bank",
                  },
                },
                128,
              ],
            },
          },
        ],
      },
    },
    {
      name: "InterestRateConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "optimalUtilizationRate",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "plateauInterestRate",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "maxInterestRate",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "insuranceFeeFixedApr",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "insuranceIrFee",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "protocolFixedFeeApr",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "protocolIrFee",
            type: {
              defined: "WrappedI80F48",
            },
          },
        ],
      },
    },
    {
      name: "Bank",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mintPk",
            type: "publicKey",
          },
          {
            name: "depositShareValue",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "liabilityShareValue",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "liquidityVault",
            type: "publicKey",
          },
          {
            name: "insuranceVault",
            type: "publicKey",
          },
          {
            name: "feeVault",
            type: "publicKey",
          },
          {
            name: "config",
            type: {
              defined: "BankConfig",
            },
          },
          {
            name: "totalBorrowShares",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "totalDepositShares",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "lastUpdate",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "BankConfig",
      docs: [
        "TODO: Convert weights to (u64, u64) to avoid precision loss (maybe?)",
      ],
      type: {
        kind: "struct",
        fields: [
          {
            name: "depositWeightInit",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "depositWeightMaint",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "liabilityWeightInit",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "liabilityWeightMaint",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "maxCapacity",
            type: "u64",
          },
          {
            name: "pythOracle",
            type: "publicKey",
          },
          {
            name: "interestRateConfig",
            type: {
              defined: "InterestRateConfig",
            },
          },
        ],
      },
    },
    {
      name: "WrappedI80F48",
      type: {
        kind: "struct",
        fields: [
          {
            name: "value",
            type: "i128",
          },
        ],
      },
    },
    {
      name: "BankConfigOpt",
      type: {
        kind: "struct",
        fields: [
          {
            name: "depositWeightInit",
            type: {
              option: {
                defined: "WrappedI80F48",
              },
            },
          },
          {
            name: "depositWeightMaint",
            type: {
              option: {
                defined: "WrappedI80F48",
              },
            },
          },
          {
            name: "liabilityWeightInit",
            type: {
              option: {
                defined: "WrappedI80F48",
              },
            },
          },
          {
            name: "liabilityWeightMaint",
            type: {
              option: {
                defined: "WrappedI80F48",
              },
            },
          },
          {
            name: "maxCapacity",
            type: {
              option: "u64",
            },
          },
          {
            name: "pythOracle",
            type: {
              option: "publicKey",
            },
          },
        ],
      },
    },
    {
      name: "WeightType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Initial",
          },
          {
            name: "Maintenance",
          },
        ],
      },
    },
    {
      name: "RiskRequirementType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Initial",
          },
          {
            name: "Maintenance",
          },
        ],
      },
    },
    {
      name: "BankVaultType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Liquidity",
          },
          {
            name: "Insurance",
          },
          {
            name: "Fee",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "MathError",
      msg: "Math error",
    },
    {
      code: 6001,
      name: "BankNotFound",
      msg: "Invalid bank index",
    },
    {
      code: 6002,
      name: "LendingAccountBalanceNotFound",
      msg: "Lending account balance not found",
    },
    {
      code: 6003,
      name: "BankDepositCapacityExceeded",
      msg: "Bank deposit capacity exceeded",
    },
    {
      code: 6004,
      name: "InvalidTransfer",
      msg: "Invalid transfer",
    },
    {
      code: 6005,
      name: "InvalidPythAccount",
      msg: "Invalid Pyth account",
    },
    {
      code: 6006,
      name: "MissingPythAccount",
      msg: "Missing Pyth account",
    },
    {
      code: 6007,
      name: "BadAccountHealth",
      msg: "Bad account health",
    },
    {
      code: 6008,
      name: "LendingAccountBalanceSlotsFull",
      msg: "Lending account balance slots are full",
    },
    {
      code: 6009,
      name: "BankAlreadyExists",
      msg: "Bank already exists",
    },
    {
      code: 6010,
      name: "BorrowingNotAllowed",
      msg: "Borrowing not allowed",
    },
    {
      code: 6011,
      name: "AccountIllegalPostLiquidationState",
      msg: "Illegal post liquidation state, account is either not unhealthy or liquidation was too big",
    },
  ],
};