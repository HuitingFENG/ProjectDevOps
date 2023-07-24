async function generateRamConfig(db) {
    const configs = Array.from(
        [100, 200, 300, 600, 1000, 1500, 2500, 4000],
        (price, k) => {
            const value = 512 * Math.pow(2, k)
            return [value, k === 0 ? '512 Mo' : `${value >> 10} Go`, price]
        }
    )

    for (const config of configs) {
        await db.query('INSERT INTO ram_config(quantite, affichage, prix) VALUES(?,?,?)', config)
    }
}

async function generateVCoreConfig(db) {
    const configs = Array.from(
        [200, 400, 800, 2000, 5000],
        (price, k) => {
            const nombre = Math.pow(2, k + 1)
            const minRam = 512 * Math.pow(2, k)
            const MaxRam = 2048 * Math.pow(2, k)
            return [nombre, minRam, MaxRam, price]
        }
    )

    for (const config of configs) {
        await db.query('INSERT INTO vcore_config(nombre, min_ram, max_ram, prix) VALUES(?,?,?,?)', config)
    }
}

async function generateOsConfig(db) {
    const configs = [
        ["Debian 9", 512, 0],
        ["Debian 10", 512, 0],
        ["CentOS 5", 512, 0],
        ["Windows Server Core", 512, 10000],
        ["Ubuntu", 1024, 0],
        ["CentOS 7", 1024, 0],
        ["Windows Server GUI", 2048, 10000]
    ]

    for (const config of configs) {
        await db.query('INSERT INTO os_config(nom_systeme, min_ram, prix) VALUES(?,?,?)', config)
    }
}

async function generateDiskConfig(db) {
    const configs = Array.from(
        [10, 20, 100, 500, 1000, 2000],
        (storage, k) => [storage, storage < 1000 ? `${storage} Go` : `${storage / 10} To`, 100 * Math.pow(2, k)]
    )

    for (const config of configs) {
        await db.query('INSERT INTO disque_config(espace, affichage, prix) VALUES(?,?,?)', config)
    }
}

async function generateIoConfig(db) {
    const configs = [[100, 200], [300, 500], [1000, 1500]]

    for (const config of configs) {
        await db.query('INSERT INTO io_config(vitesse, prix) VALUES(?,?)', config)
    }
}

module.exports.generateConfigs = async function (db) {
    await generateRamConfig(db)
    await Promise.all([
        generateVCoreConfig(db),
        generateOsConfig(db),
        generateDiskConfig(db),
        generateIoConfig(db)
    ])

}