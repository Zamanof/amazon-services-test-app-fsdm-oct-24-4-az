import {getPool, sql} from "./db.mjs";

const ACTIVATE_DISCOUNT_SQL = `
UPDATE p
SET p.IsDiscountActive = 1
FROM Products as p
WHERE p.IsDiscountActive = 0 
    AND (p.DiscountStart IS NOT NULL 
    AND p.DiscountEnd IS NOT NULL
    AND @nowUtc >= p.DiscountStart
    AND @nowUtc <= p.DiscountEnd)
`;

const DEACTIVATE_DISCOUNT_SQL = `
UPDATE p
SET p.IsDiscountActive = 0
FROM Products as p
WHERE p.IsDiscountActive = 1 
    AND   (p.DiscountStart IS NULL 
        OR p.DiscountStart IS NULL 
        OR @nowUtc < p.DiscountStart
        OR @nowUtc > p.DiscountEnd)    
`;

async function runUpdate(pool, sqlText, nowUtc){
    const request = pool.request();
    request.input("nowUtc", sql.DateTime2, nowUtc);
    const result =  await request.query(sqlText);
    return result.rowsAffected?.[0] ?? 0
}

export const handler = async (event) => {
    const startedAt = new Date();
    console.info("Discount scheduler started", {event, startedAtUtc: startedAt.toISOString()});
    const pool = await getPool();

    try{
        const activatedCount = await runUpdate(pool, ACTIVATE_DISCOUNT_SQL, startedAt);
        const  deactivatedCount = await runUpdate(pool, DEACTIVATE_DISCOUNT_SQL, startedAt);
        const message = {
            status: "ok",
            startedAt: startedAt.toISOString(),
            activatedCount,
            deactivatedCount,
        }
        console.info("Discount scheduler finished", message);

        return {
            statusCode: 200,
            body: JSON.stringify(message)
        };
    }
    catch(err){
        console.error("Discount scheduler failed", {
            message: err.message,
            stack: err.stack,
            code: err.code,
            name: err.name,
        });

        return {
            statusCode: 500,
            body:JSON.stringify({
                status: "error",
                errorMessage: err.message,
            })
        }
    }
};
