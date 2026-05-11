#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_initialize_and_balance() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, Token);
    let client = TokenClient::new(&env, &contract_id);

    let admin = Address::generate(&env);

    client.initialize(
        &admin,
        &String::from_str(&env, "Soroban Token"),
        &String::from_str(&env, "STK"),
        &7,
        &1_000_000_0000000,
    );

    assert_eq!(client.balance(&admin), 1_000_000_0000000);
    assert_eq!(client.symbol(), String::from_str(&env, "STK"));
    assert_eq!(client.decimals(), 7);
}

#[test]
fn test_transfer() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, Token);
    let client = TokenClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let user = Address::generate(&env);

    client.initialize(
        &admin,
        &String::from_str(&env, "Soroban Token"),
        &String::from_str(&env, "STK"),
        &7,
        &1_000_0000000,
    );

    client.transfer(&admin, &user, &100_0000000);

    assert_eq!(client.balance(&admin), 900_0000000);
    assert_eq!(client.balance(&user), 100_0000000);
}

#[test]
fn test_mint() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, Token);
    let client = TokenClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let user = Address::generate(&env);

    client.initialize(
        &admin,
        &String::from_str(&env, "Soroban Token"),
        &String::from_str(&env, "STK"),
        &7,
        &0,
    );

    client.mint(&admin, &user, &500_0000000);
    assert_eq!(client.balance(&user), 500_0000000);
    assert_eq!(client.total_supply(), 500_0000000);
}