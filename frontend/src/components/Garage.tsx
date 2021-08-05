import React, { useContext, useEffect, useState } from 'react';
import { RobotsContext } from "../hardhat/SymfoniContext";

interface Props { }

export const Garage: React.FC<Props> = () => {
    const robots = useContext(RobotsContext)

    useEffect(() => {
        const doAsync = async () => {
            if (!robots.instance) return
            console.log("Robots is deployed at ", robots.instance.address)
        };
        doAsync();
    }, [robots])

    const handleSetRobots = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!robots.instance) throw Error("Robots instance not ready")
        if (robots.instance) {
            const tx = await robots.instance.sym
            console.log("setRobots tx", tx)
            await tx.wait()
            console.log("New robot minted: ", await robots.instance.purchase())
        }
    }

    return (
        <div>
            <p>{message}</p>
            <input className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onChange={(e) => setInputGreeting(e.target.value)}></input>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => handleSetRobots(e)}>Set greeting</button>
            <br />
        </div>
    )
}